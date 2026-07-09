import app from "./app";
import config from "./config";

async function main() {
    app.listen(config.port, () => {
        console.log(` GearUp server is running on port ${config.port}`);
    });
}

main();
