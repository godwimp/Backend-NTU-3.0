# Backend-NTU-2.0

A TypeScript-based Express backend for water monitoring system with real-time MQTT data collection and WebSocket communication.

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Real-time Communication**: Socket.IO, MQTT
- **Authentication**: JWT

## Project Structure

```
├── src/                    # TypeScript source files
│   ├── bin/               # Entry point
│   ├── controllers/       # Request handlers
│   ├── helpers/           # Utility functions
│   ├── middlewares/       # Express middlewares
│   ├── models/            # Sequelize models
│   ├── routers/           # Route definitions
│   ├── types/             # TypeScript type definitions
│   └── app.ts             # Express app configuration
├── migrations/            # Database migrations
├── seeders/              # Database seeders
├── cert/                 # SSL certificates
├── data/                 # Seed data files
└── dist/                 # Compiled JavaScript (generated)
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- MQTT broker

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy the `.env.example` file and rename it to `.env`, then match the configuration with your MQTT configuration.

3. Configure database in `config/config.json`

4. Run migrations:
```bash
npm run migrate
```

5. Seed initial data:
```bash
npm run seed
```

### Development

Run the development server with hot-reload:
```bash
npm run dev
```

### Production

1. Build the TypeScript project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /login` - User login
- `POST /register` - Register new user (admin only)

### Data Endpoints
- `GET /data/panelA` - Get Panel A data (supports `?filter=daily|weekly|monthly`)
- `GET /data/panelB` - Get Panel B data
- `GET /data/panelC` - Get Panel C data
- `GET /data/panelD` - Get Panel D data
- `GET /data/panelE` - Get Panel E data
- `GET /data/panelA1/latest` - Get latest Panel A data
- `GET /data/panelB1/latest` - Get latest Panel B data
- `GET /data/panelC1/latest` - Get latest Panel C data
- `GET /data/panelD1/latest` - Get latest Panel D data
- `GET /data/panelE1/latest` - Get latest Panel E data

## Real-time Features

- **MQTT Integration**: Subscribes to water monitor topics and stores data in the database
- **WebSocket**: Broadcasts real-time data to connected clients via Socket.IO

## License

MIT