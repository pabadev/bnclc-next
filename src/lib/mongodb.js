// lib/mongodb.js
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGO_URI_ATLAS

if (!MONGODB_URI) {
  throw new Error('Por favor, define la variable MONGO_URI_LOCAL en tu archivo .env.local')
}

/** * Global es usado aquí para mantener la conexión en caché a través de las recargas
 * de caliente (HMR) en desarrollo. Esto evita que las conexiones crezcan exponencialmente.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false
      // Nota: En versiones modernas de Mongoose (v6+),
      // useNewUrlParser y useUnifiedTopology ya están incluidos por defecto.
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB conectado con éxito')
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    console.error('❌ Error conectando a MongoDB:', e.message)
    throw e
  }

  return cached.conn
}

export default dbConnect
