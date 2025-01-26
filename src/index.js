import { Application } from 'pixi.js';
import { Game } from './game';

(async () =>
{
    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({ background: '#1099bb', resizeTo: document.body });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    const reelConfig = {
        reel: 5,
        row: 3,
        reelWidth: 100,
        symbolSize: 100,
    }

    const game = new Game(app ,reelConfig);
    await game.init();
})();