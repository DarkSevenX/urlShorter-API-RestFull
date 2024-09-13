import cron from 'node-cron';
import { exec } from 'child_process';

const url = 'https://bysh.glitch.me/docs' // Cambia esto a la URL que necesites
const command = `curl -X GET ${url}`;

// Define el cron job para ejecutar cada 2 minutos
cron.schedule('*/2 * * * *', () => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    //console.log(`Stdout: ${stdout}`);
  });
});

