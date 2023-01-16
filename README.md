<img src="https://planet.one/static/media/scene-logotype-white.f7dff4982e3d8e0003be3f937904a442.svg" width="480"/>

<img src="https://tirrel.sfo3.digitaloceanspaces.com/assets/scene-demo-screenshot.jpg" width="480"/>

[Download Here](https://planet.one/scene/)

<br>
<br>

## Development

```bash
yarn install
# Make sure that you aren't already running Scene.
yarn dev ## spawns react + electron dev servers
```

Log in to your local fake zod (use the correct port).

## Distribution

```bash
npm run electron:package:mac
npm run electron:package:win
npm run electron:package:linux
```

The result will be in `./dist`, for example:

```bash
open ./dist/Scene-0.0.12-arm64.dmg
```

