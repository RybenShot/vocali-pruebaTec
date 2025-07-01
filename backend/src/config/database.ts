import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vocalid';
        
        await mongoose.connect(mongoURI);
        
        console.log('✅ MongoDB conectado exitosamente');
        
        // Manejar eventos de conexión
        mongoose.connection.on('error', (err) => {
            console.error('❌ Error de MongoDB:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('🔌 MongoDB desconectado');
        });
        
        // Manejar cierre graceful
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('🔒 Conexión a MongoDB cerrada.');
            process.exit(0);
        });
        
    } catch (error) {
        console.error('❌ Error conectando a MongoDB:', error);
        process.exit(1);
    }
};