
// src/services/guardarFicha.js
import { supabase } from '../lib/supabaseClient';

export const guardarFicha = async (respuestas, setMensajes) => {
    const { error } = await supabase
        .from('fichas_emprendimientos')
        .insert([{
            instagram: respuestas.instagram,
            provincia: respuestas.provincia || 'No compartido',
            ciudad: respuestas.ciudad || 'No compartido',
            barrio: respuestas.barrio || 'No compartido',
            tipo: respuestas.tipo || 'No compartido',
            rubro: respuestas.rubro || 'No compartido',
            descripcion: respuestas.descripcion || 'No compartido',
            email: respuestas.email || 'No compartido',
            website: respuestas.website || 'No compartido'
        }]);

    if (error) {
        console.error("❌ Error al guardar en Supabase:", error.message);
        setMensajes(prev => [...prev, {
            id: crypto.randomUUID(),
            emisor: 'sistema',
            texto: `😕 Hubo un problema al guardar tu ficha. Podés intentar más tarde.`,
            timestamp: new Date().toISOString()
        }]);
    } else {
        console.log("✅ Ficha guardada en Supabase");
    }
};