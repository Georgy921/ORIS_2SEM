import { useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
/* import { toursApi } from '../services/api'; */

function ToursDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка данных тура
  useEffect(() => {
    async function loadTour() {
      try {
        const res = await fetch('/data/tours.json');
        const tours = await res.json();
        const found = tours.find(t => t.id == id);
        setTour(found || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadTour();
  }, [id]);

  // Загрузка Яндекс.Карт
  useEffect(() => {
    if (typeof ymaps === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=c48cab0f-e2c1-4576-8617-bfb16f70401d';
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      // Очистка карты при размонтировании
      const mapContainer = document.getElementById('yandex-map');
      if (mapContainer) mapContainer.innerHTML = '';
    };
  }, [tour]);

  function initMap() {
    if (!tour?.arrival_city) return;
    
    ymaps.ready(function () {
      // Координаты можно брать из API или использовать геокодер
      const coords = [26.8, 30.8]; // Заглушка — заменить на реальные координаты
      const map = new ymaps.Map('yandex-map', {
        center: coords,
        zoom: 6,
        controls: ['zoomControl', 'fullscreenControl']
      });

      const placemark = new ymaps.Placemark(coords, {
        hintContent: tour?.arrival_city,
        balloonContent: tour?.hotel_name
      }, {
        preset: 'islands#blueDotIcon'
      });

      map.geoObjects.add(placemark);
    });
  }

  function handleRedirectHome() {
    navigate('/');
  }

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!tour) return <div className="error-message">Тур не найден</div>;

  return (
    <div className="main-wrapper">
      <header className="header">
        <div className="header-container">
          <div className="header-top">
            <a href="#" className="logo" onClick={handleRedirectHome}>
              <img src="src/logo.png" alt="Logo" />
            </a>
            
            <nav className="header-nav" style={{ marginRight: '20px' }}>
              <ul className="header-links" id="eproblema">
                <li style={{ marginRight: '20px' }}><a href="#">Подобрать тур</a></li>
                <li>
                  <a href="#">
                    <span>
                      <img src="src/expertOnlineIcon.svg" className="header--nav--icon" alt="" />
                      Эксперты online
                    </span>
                  </a>
                </li>
                <li><a href="#">Офисы продаж</a></li>
                <li><a href="#">О компании</a></li>
                <li><a href="#">Вход для агенств</a></li>
              </ul>
            </nav>
            
            <nav className="header-nav" style={{ paddingLeft: '2px' }}>
              <ul className="header-links">
                <li style={{ marginRight: '0px' }}>
                  <a href="#">
                    <img 
                      src="src/HeaderLocation.png" 
                      style={{ width: '15px', left: '-19px', height: '22px' }} 
                      className="header--nav--icon" 
                      alt=""
                    />
                    Москва
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="src/phone.png" className="header--nav--icon" alt="" />
                    8 800 775 775 8
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); /* showAuthModal */ }}>
                    <img 
                      id="auth-icon" 
                      src="src/BeforeAuthUser.png" 
                      style={{ transform: 'scale(0.75)' }} 
                      className="header--nav--icon" 
                      alt="Auth"
                    />
                  </a>
                </li>
                <li><a href="#"><img src="src/heart.png" style={{ transform: 'scale(0.75)' }} className="header--nav--icon" alt="Favorites" /></a></li>
                <li><a href="#"><img src="src/scales.png" style={{ transform: 'scale(0.75)' }} className="header--nav--icon" alt="Compare" /></a></li>
                <li><a href="#"><img src="src/Basket.png" style={{ transform: 'scale(0.75)' }} className="header--nav--icon" alt="Cart" /></a></li>
              </ul>
            </nav>
          </div>

          <nav className="main-menu">
            <ul>
              <li><a href="#">Туры</a></li>
              <li><a href="#">Отели</a></li>
              <li><a href="#">Авиабилеты</a></li>
              <li><a href="#">Экскурсионные туры</a></li>
              <li><a href="#">Круизы</a></li>
              <li><a href="#">Поиск по странам</a></li>
              <li style={{ marginRight: '0px' }}>
                <a href="#" id="hot-links">
                  <span className="fire-icon">🔥</span> Горящие туры
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container">
        {/* Хлебные крошки */}
        <div className="breadcrumbs">
          <a href="#" onClick={handleRedirectHome}>Главная</a>
          <span>/</span>
          <a href="#">{tour.arrival_city}</a>
          <span>/</span>
          <a href="#">{tour.name}</a>
          <span>/</span>
          <span>{tour.hotel_name}</span>
        </div>

        {/* Заголовок отеля */}
        <div className="hotel-header">
          <div className="hotel-rating">{tour.rating}★</div>
          <h1 className="hotel-title">{tour.hotel_name}</h1>
          <div className="hotel-location">
            {tour.arrival_city}, {tour.name}, {tour.hotel_name}
          </div>
        </div>

        {/* Контент: галерея + описание */}
        <div className="hotel-content">
          {/* Галерея */}
          <div className="hotel-gallery">
            <div className="main-photo">
              <img src={tour.image_url} alt={tour.hotel_name} />
              <div className="rating-badge">
                {tour.rating}
                <br />
                <small>349 отзывов</small>
              </div>
              <div className="warning-badge">⚠️ Важно! Гости не могут пользоваться...</div>
            </div>
          </div>

          {/* Описание */}
          <div className="hotel-description">
            <h2>Описание отеля</h2>

            <div className="amenities">
              <div className="amenity">
                <span className="amenity-icon">📍</span>
                <span>Тихое расположение</span>
              </div>
              <div className="amenity">
                <span className="amenity-icon">🏖️</span>
                <span>1-я линия</span>
              </div>
              <div className="amenity">
                <span className="amenity-icon">📶</span>
                <span>Wi-Fi на всей территории</span>
              </div>
              <div className="amenity">
                <span className="amenity-icon">👶</span>
                <span>Детский клуб</span>
              </div>
              <div className="amenity">
                <span className="amenity-icon">🏊</span>
                <span>Открытый бассейн</span>
              </div>
              <div className="amenity">
                <span className="amenity-icon">❄️</span>
                <span>Кондиционер</span>
              </div>
            </div>

            <div className="description-text">
              {tour.general_description}
            </div>

            <a href="#" className="read-more">Подробнее об отеле</a>

            <div className="price-block">
              <div className="price-title">Цена за тур с перелетом</div>
              <div className="price-dates">
                С {tour.departure_date} · {tour.nights_count} ночей · {tour.adults_count} взр
              </div>
              <div className="price-amount">от {tour.tour_price?.toLocaleString('ru-RU')} ₽</div>
              <div className="price-info">
                <div>① Условия оплаты</div>
                <div>① {tour.monthly_payment?.toLocaleString('ru-RU')} ₽/мес.</div>
              </div>
              <button className="select-btn">Выбрать номер</button>
            </div>
          </div>
        </div>

        {/* Форма поиска */}
        <div className="search-form">
          <div className="search-field-wrapper" style={{ borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>
            <label className="floating-label">Откуда</label>
            <input 
              type="text" 
              className="input-field" 
              id="from-field" 
              defaultValue="Москва" 
              style={{ borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}
            />
          </div>
          <div className="search-field-wrapper">
            <label className="floating-label">Куда</label>
            <input type="text" className="input-field" id="to-field" defaultValue="" />
          </div>
          <div className="search-field-wrapper">
            <label className="floating-label">Дата вылета</label>
            <input type="text" className="input-field" id="date-field" defaultValue="" />
          </div>
          <div className="search-field-wrapper">
            <label className="floating-label">Длительность</label>
            <input type="text" className="input-field" id="duration-field" defaultValue="" />
          </div>
          <div className="search-field-wrapper">
            <label className="floating-label">Кто едет</label>
            <input type="text" className="input-field" id="people-field" defaultValue="" />
          </div>
          <button className="search-btn">Найти</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          {/* Секция подписки */}
          <div className="footer-subscribe">
            <div className="subscribe-text">
              <h3>Будь в курсе</h3>
              <p>Подпишитесь и получайте выгодные туры на свою почту</p>
            </div>
            <div className="subscribe-form">
              <input type="email" placeholder="Email" className="subscribe-input" />
              <button className="subscribe-btn">Подписаться</button>
            </div>
            <p className="subscribe-note">
              Нажимая «Подписаться» вы даёте согласие на обработку{' '}
              <a href="#">персональных данных.</a>
            </p>
          </div>

          <div className="footer-divider" />

          {/* Основная часть footer */}
          <div className="footer-main">
            {/* Левая колонка */}
            <div className="footer-left">
              <div className="footer-logo-section">
                <img src="src/logo1.png" alt="FUN&SUN" className="footer-logo" />
                <div className="contact-info">
                  <div className="footer-phone">8 800 775 775 8</div>
                  <div className="footer-socials">
                    <a href="#" className="social-icon"><img src="src/vk.png" alt="VK" /></a>
                    <a href="#" className="social-icon"><img src="src/tg.png" alt="Telegram" /></a>
                    <a href="#" className="social-icon"><img src="src/tiktok.png" alt="TikTok" /></a>
                    <a href="#" className="social-icon"><img src="src/youtube.png" alt="YouTube" /></a>
                  </div>
                </div>
              </div>

              <div className="footer-app">
                <div className="app-text">
                  <strong>Через приложение удобнее!</strong>
                  <p>Наведите камеру смартфона на QR-код и скачайте приложение FUN&SUN</p>
                </div>
                <img src="src/qr-code.png" alt="QR-код" className="app-qr" />
              </div>

              <div className="footer-currency">
                <div className="currency-item">
                  <img src="https://fstravel.com/storage/images/eur.png" alt="EUR" className="currency-flag" />
                  <span className="currency-code">EUR</span>
                  <span className="currency-value">96.8</span>
                </div>
                <div className="currency-item">
                  <img src="https://fstravel.com/storage/images/usd1.png" alt="USD" className="currency-flag" />
                  <span className="currency-code">USD</span>
                  <span className="currency-value">81.5</span>
                </div>
              </div>
              <a href="#" className="currency-history">История изменения курса</a>

              <p className="footer-disclaimer">
                Представленная на сайте информация носит справочный характер и не является публичной офертой.
                ©2026, FUN&SUN
                <br />
                <a href="#" className="legal-link">Правовая информация</a>
              </p>
            </div>

            {/* Колонки меню */}
            <div className="footer-column">
              <h4>Отдых</h4>
              <ul>
                <li><a href="#">Туры</a></li>
                <li><a href="#">Отели</a></li>
                <li><a href="#">Экскурсионные туры</a></li>
                <li><a href="#">Авиабилеты</a></li>
                <li><a href="#">Горящие туры</a></li>
                <li><a href="#">Туры по России</a></li>
                <li><a href="#">Туры на регулярных рейсах</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>FUN&SUN</h4>
              <ul>
                <li><a href="#">Контакты</a></li>
                <li><a href="#">О нас</a></li>
                <li><a href="#">Новости</a></li>
                <li><a href="#">Офисы продаж</a></li>
                <li><a href="#">Программа лояльности</a></li>
                <li><a href="#">Реферальная программа</a></li>
                <li><a href="#">Акции</a></li>
                <li><a href="#">Условия оплаты</a></li>
                <li><a href="#">Партнерская программа</a></li>
                <li><a href="#">Деловые поездки и MICE</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Помощь</h4>
              <ul>
                <li><a href="#">Проверить статус заказа</a></li>
                <li><a href="#">Равнозначный турпродукт</a></li>
                <li><a href="#">Обратиться в юридический отдел</a></li>
                <li><a href="#">Обратиться в службу безопасности</a></li>
                <li><a href="#">Правила въезда</a></li>
                <li><a href="#">Визы</a></li>
                <li><a href="#">Как забронировать тур онлайн?</a></li>
                <li><a href="#">Условия отмены тура</a></li>
                <li><a href="#">Правила покупки билетов на самолет, ж/д поезд и автобус без тура</a></li>
                <li><a href="#">Политика в области защиты и обработки персональных данных</a></li>
              </ul>
            </div>
          </div>

          {/* Доп. ссылки */}
          <div className="footer-links-bottom">
            <a href="#">Круизы</a>
            <a href="#">Страны</a>
            <a href="#">Новости туризма</a>
          </div>

          <div className="footer-divider" />

          {/* Cookie */}
          <div className="footer-cookie">
            <p>
              Для повышения удобства работы с сайтом, ООО ТТ-Трэвел{' '}
              <a href="#">использует файлы cookie</a>. Продолжая использовать наш сайт, вы принимаете условия
              Соглашения в отношении использования пользовательских данных.{' '}
              <a href="#">Если вы не хотите, чтобы пользовательские данные обрабатывались, отключите cookie в настройках браузера</a>
            </p>
          </div>
        </div>

        {/* Кнопка наверх */}
        <button 
          className="scroll-to-top" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src="src/scroll_up.png" alt="Наверх" />
        </button>
      </footer>

      {/* Модальное окно авторизации */}
      <AuthModal />

      {/* Модальное окно карты */}
      <MapModal tour={tour} />
    </div>
  );
}

// Вынесенные компоненты для чистоты кода
function AuthModal() {
  return (
    <div 
      id="auth-modal" 
      style={{
        display: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{
        background: 'white',
        padding: '30px',
        width: '500px',
        maxWidth: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      }}>
        <div style={{ marginBottom: '20px' }}>
          <input 
            type="email" 
            id="auth-email" 
            placeholder="Email" 
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '16px',
              marginBottom: '10px',
              boxSizing: 'border-box',
            }}
          />
          <div style={{ position: 'relative' }}>
            <input 
              type="password" 
              id="auth-password" 
              placeholder="Пароль" 
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box',
              }}
            />
            <div 
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#999',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <a 
            href="#" 
            style={{
              display: 'block',
              textAlign: 'right',
              color: '#007bff',
              fontSize: '14px',
              marginTop: '5px',
              textDecoration: 'none',
            }}
          >
            Не помню пароль
          </a>
        </div>
        <button 
          style={{
            width: '100%',
            padding: '14px',
            background: '#FFD700',
            color: '#333',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '15px',
            cursor: 'pointer',
          }}
        >
          Войти
        </button>
        {/* ... остальная часть формы ... */}
      </div>
    </div>
  );
}

function MapModal({ tour }) {
  return (
    <div 
      id="map-modal" 
      style={{
        display: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.5)',
        zIndex: 2000,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{
        background: 'white',
        width: '90%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          padding: '15px 20px',
          background: '#f5f7fa',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #eee',
        }}>
          <h3>Туры в {tour?.arrival_city}: найдено предложений</h3>
          <button 
            onClick={() => document.getElementById('map-modal').style.display = 'none'}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666',
            }}
          >
            ×
          </button>
        </div>

        <div style={{ flexGrow: 1, minHeight: '600px', position: 'relative' }}>
          <div id="yandex-map" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </div>
  );
}

export default ToursDetailsPage;