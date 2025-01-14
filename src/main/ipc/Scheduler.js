import schedule from 'node-schedule';
import fs from 'fs';
import { join } from 'path';
import { playAudio } from './Speaker';


const filePath = join(__dirname, '../../src/renderer/src/utils/alarms_config.json');
let jobs = [];
let mainWindow = null; // Referência para a janela principal

// Mapeamento de dias para números (compatível com cron)
const daysMap = {
  Dom: 0,
  Seg: 1,
  Ter: 2,
  Qua: 3,
  Qui: 4,
  Sex: 5,
  Sáb: 6,
};

// Define a janela principal para comunicação IPC
export function setMainWindow(window) {
  mainWindow = window;
}

export function setupScheduler() {
  // console.log('Inicializando o Scheduler...');

  // Gera expressão cron para alarmes regulares
  const generateCronExpression = (time, day) => {
    const [hour, minute] = time.split(':');
    return `${minute} ${hour} * * ${daysMap[day]}`;
  };

  // Agenda promo_alarms
  const loadPromoAlarms = (promo) => {
    promo.timeRanges.forEach((range) => {
      const cronDays = promo.days.map((day) => daysMap[day]).join(',');
  
      const intervalJob = schedule.scheduleJob(`*/${promo.interval} * * * ${cronDays}`, () => {
        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 5);
  
        if (currentTime >= range.start && currentTime <= range.end) {
          // console.log(`Tocando promo alarm: ${promo.audioPath}`);
          playAudio(promo.audioPath); // Corrigido para passar o caminho do áudio
        } else {
          // console.log(
          //   `Fora do intervalo permitido (${range.start} - ${range.end}): ${currentTime}`
          // );
        }
      });
  
      if (intervalJob) jobs.push(intervalJob);
    });
  };
  

  // Agenda alarmes regulares
  const loadAlarms = () => {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      // console.log('JSON carregado:', data);
  
      // Cancela todos os jobs anteriores
      jobs.forEach((job) => {
        if (job && typeof job.cancel === 'function') {
          job.cancel();
        }
      });
      jobs = [];
  
      // Agenda alarmes regulares
      if (data.alarms && data.alarms.length > 0) {
        data.alarms.forEach((alarm) => {
          alarm.days.forEach((day) => {
            const cronExpression = generateCronExpression(alarm.time, day);
            const job = schedule.scheduleJob(cronExpression, () => {
              // console.log(`Tocando alarme regular: ${alarm.audioPath}`);
              playAudio(alarm.audioPath); // Usa "alarm.audioPath"
            });
            if (job) jobs.push(job);
          });
        });
      } else {
        // console.log('Nenhum alarme regular encontrado.');
      }
  
      // Agenda promo_alarms
      if (data.promo_alarms && data.promo_alarms.length > 0) {
        data.promo_alarms.forEach((promo) => loadPromoAlarms(promo));
      } else {
        // console.log('Nenhum promo alarm encontrado.');
      }
  
      console.log('Alarmes carregados e agendados com sucesso!');
    } catch (error) {
      console.error('Erro ao carregar os alarmes:', error);
    }
  };
  

  // Observa mudanças no arquivo JSON
  fs.watch(filePath, (eventType) => {
    if (eventType === 'change') {
      // console.log('Arquivo JSON atualizado. Recarregando alarmes...');
      loadAlarms();
    }
  });

  // Carrega os alarmes na inicialização
  loadAlarms();
}
