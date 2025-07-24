# Implementación de Video en Tienda Nube
## Guía técnica para Café Registrado

---

### 🎬 **Objetivo**

Integrar el video existente de Café Registrado en el nuevo diseño de la página principal manteniendo la compatibilidad con Tienda Nube.

---

### 📋 **Pasos de Implementación**

#### **1. Preparación del Video**

**Ubicar el video actual:**
- Identificar la URL del video en el sitio actual
- Verificar si está hospedado en YouTube, Vimeo o servidor propio
- Asegurar que el video tenga buena calidad (mínimo 720p)

**Formatos recomendados:**
- **YouTube**: Más fácil de implementar, mejor rendimiento
- **Vimeo**: Mejor calidad sin publicidad
- **Servidor propio**: Mayor control pero requiere optimización

#### **2. Código HTML para Tienda Nube**

```html
<!-- Sección de Video - Agregar en template home.tpl -->
<section class="video-section">
    <div class="container">
        <div class="video-content">
            <h2>Descubrí Nuestro Proceso</h2>
            <p class="video-description">Conocé cómo seleccionamos y tostamos artesanalmente cada grano para lograr el café perfecto</p>
            <div class="video-container">
                <div class="video-wrapper">
                    {% if video_url %}
                        <iframe 
                            src="{{ video_url }}" 
                            width="640" 
                            height="360" 
                            frameborder="0" 
                            allow="autoplay; fullscreen; picture-in-picture" 
                            allowfullscreen
                            title="Café Registrado - Nuestro Proceso">
                        </iframe>
                    {% else %}
                        <!-- Video de ejemplo con el real -->
                        <iframe 
                            src="https://player.vimeo.com/video/ID_DEL_VIDEO" 
                            width="640" 
                            height="360" 
                            frameborder="0" 
                            allow="autoplay; fullscreen; picture-in-picture" 
                            allowfullscreen
                            title="Café Registrado - Nuestro Proceso">
                        </iframe>
                    {% endif %}
                </div>
                <div class="video-overlay">
                    <button class="play-button" onclick="playVideo()">
                        <span class="play-icon">▶</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>
```

#### **3. CSS Personalizado**

**Agregar en el archivo CSS del tema:**

```css
/* Video Section */
.video-section {
    padding: 5rem 0;
    background: linear-gradient(135deg, #FFFFFF 0%, #FFF8F2 100%);
}

.video-content {
    text-align: center;
}

.video-description {
    font-size: 1.2rem;
    color: #6B4E3D;
    margin-bottom: 3rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.video-container {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.video-wrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
}

.video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
}

.video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    transition: all 0.3s ease;
    cursor: pointer;
}

.video-overlay:hover {
    opacity: 0.8;
}

.play-button {
    background: #FF7A00;
    border: none;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.play-button:hover {
    transform: scale(1.1);
    background: #FF9933;
}

.play-icon {
    color: #FFFFFF;
    font-size: 2rem;
    margin-left: 4px;
}

/* Responsive */
@media (max-width: 768px) {
    .video-section {
        padding: 3rem 0;
    }
    
    .video-container {
        margin: 0 15px;
    }
    
    .play-button {
        width: 60px;
        height: 60px;
    }
    
    .play-icon {
        font-size: 1.5rem;
    }
}
```

#### **4. JavaScript Funcional**

**Agregar al archivo JS del tema:**

```javascript
// Video functionality
function playVideo() {
    const overlay = document.querySelector('.video-overlay');
    const iframe = document.querySelector('.video-wrapper iframe');
    
    if (overlay && iframe) {
        // Ocultar overlay
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
        
        // Agregar parámetro autoplay al iframe
        const currentSrc = iframe.src;
        if (currentSrc.includes('vimeo.com')) {
            iframe.src = currentSrc.includes('?') ? 
                currentSrc + '&autoplay=1' : 
                currentSrc + '?autoplay=1';
        } else if (currentSrc.includes('youtube.com') || currentSrc.includes('youtu.be')) {
            iframe.src = currentSrc.includes('?') ? 
                currentSrc + '&autoplay=1' : 
                currentSrc + '?autoplay=1';
        }
        
        // Analytics (opcional)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'video_play', {
                'video_title': 'Proceso Café Registrado'
            });
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const videoOverlay = document.querySelector('.video-overlay');
    if (videoOverlay) {
        videoOverlay.addEventListener('click', playVideo);
    }
});
```

---

### 📍 **Ubicación en Tienda Nube**

#### **Archivos a Modificar:**

1. **`/templates/home.tpl`** - Agregar la sección HTML
2. **`/static/css/style.css`** - Agregar estilos CSS
3. **`/static/js/main.js`** - Agregar funcionalidad JavaScript

#### **Posición Recomendada:**

Colocar la sección de video **después** de los productos destacados y **antes** de la sección "Sobre Nosotros".

---

### ⚙️ **Configuración Avanzada**

#### **Variables de Configuración**

En el panel admin de Tienda Nube, crear las siguientes configuraciones:

```liquid
{# En el config.tpl o configuración del tema #}
{% set video_url = "https://player.vimeo.com/video/ID_REAL_DEL_VIDEO" %}
{% set video_title = "Café Registrado - Nuestro Proceso" %}
{% set video_description = "Conocé cómo seleccionamos y tostamos artesanalmente cada grano para lograr el café perfecto" %}
```

#### **Optimizaciones de Rendimiento**

1. **Lazy Loading**: El video se carga solo cuando está visible
2. **Thumbnail Preview**: Usar una imagen preview en lugar del iframe inicial
3. **Compresión**: Asegurar que el video esté optimizado para web

---

### 🔧 **Testing y Validación**

#### **Checklist de Pruebas:**

- [ ] Video se reproduce correctamente en desktop
- [ ] Video se reproduce correctamente en móvil
- [ ] Botón de play funciona correctamente
- [ ] Overlay se oculta al reproducir
- [ ] Responsive funciona en diferentes pantallas
- [ ] Compatible con navegadores principales
- [ ] No afecta la velocidad de carga de la página

#### **Browsers a Testear:**

- Chrome (desktop/mobile)
- Safari (desktop/mobile)
- Firefox (desktop)
- Edge (desktop)

---

### 📊 **Métricas y Analytics**

#### **Eventos a Trackear:**

- **video_play**: Cuando se reproduce el video
- **video_complete**: Cuando se termina de ver (si es posible)
- **video_engagement**: Tiempo de visualización

#### **Código de Google Analytics:**

```javascript
// Agregar en el script de video
gtag('event', 'video_play', {
    'event_category': 'engagement',
    'event_label': 'proceso_cafe',
    'video_title': 'Proceso Café Registrado'
});
```

---

### 🚀 **Go Live**

#### **Pasos Finales:**

1. **Backup** del tema actual
2. **Implementar** cambios en staging
3. **Testear** exhaustivamente
4. **Deploy** a producción
5. **Monitorear** métricas post-launch

---

### 📞 **Soporte**

Para dudas técnicas sobre la implementación:
- Consultar documentación oficial de Tienda Nube
- Verificar compatibilidad con la versión actual del tema
- Testear en diferentes dispositivos antes del go-live

---

**Nota**: Reemplazar `ID_REAL_DEL_VIDEO` con el ID real del video de Café Registrado una vez identificado en el sitio actual. 