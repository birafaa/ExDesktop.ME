# exDesktop

Сайт [exDesktop](https://exdesktop.xyz): модифицированный кроссплатформенный клиент Telegram для компьютера. Версия на сайте — 7.3.3.(5), лицензия GPL-3.0.

Исходники этого сайта: [github.com/birafaa/ExDesktop.ME](https://github.com/birafaa/ExDesktop.ME).

Стек: React, TypeScript, Vite, Material UI.

## Запуск

Нужен Node.js 22 или новее.

```bash
npm install
npm run dev
```

Сервер разработки слушает порт `47281`: [http://127.0.0.1:47281](http://127.0.0.1:47281).

Проверка типов и сборка:

```bash
npm run build
```

Готовые файлы лежат в `dist/`. Локальный просмотр сборки:

```bash
npm run preview
```

Линтер:

```bash
npm run lint
```

## Тема

Светлая и тёмная темы. Пока человек не нажал переключатель, сайт следует системной настройке. Выбор записывается в `localStorage` под ключом `exdesktop-color-scheme`. Анимации отключаются при `prefers-reduced-motion`.

## Публикация

Собери проект и выложи содержимое `dist/` на статический хостинг в корень домена `exdesktop.xyz`.

Пример для nginx: корень сайта указывает на `dist`, а неизвестные пути возвращают `index.html`, чтобы работали `/docs` и прямые ссылки.

```nginx
root /var/www/exdesktop;
index index.html;
location / {
  try_files $uri $uri/ /index.html;
}
```

Если сайт будет не в корне домена, задай `base` в `vite.config.ts`.
