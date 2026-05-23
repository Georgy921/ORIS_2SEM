// pages/ToursPage.jsx
import { useEffect, useCallback } from 'react';
import { useFilters } from '../hooks/useFilters';
import { useTours } from '../hooks/useTours';
import { useAuth } from '../hooks/useAuth';
import Filters from '../components/Filters/Filters';
import TourCard from '../components/TourCard/TourCard';
import AuthModal from '../components/AuthModal/AuthModal';
import MapModal from '../components/MapModal/MapModal';

export default function ToursPage() {
  const filters = useFilters();
  const { tours, loading, error, loadTours } = useTours();
  const auth = useAuth();

  // Загрузка туров при изменении фильтров
  useEffect(() => {
    loadTours(filters.getFilterPayload);
  }, [filters.getFilterPayload, loadTours]);

  // Обработчик сворачивания фильтров (аккордеон)
  const toggleFilter = useCallback((e) => {
    const section = e.currentTarget.parentElement;
    section?.classList.toggle('active');
  }, []);

  // Обработчик карты
  const openMapModal = useCallback(() => {
    // Логика открытия модалки карты
    console.log('Open map modal');
  }, []);

  if (error) {
    return <div className="error-message">Ошибка: {error}</div>;
  }

  return (
    <div className="main-wrapper">
      {/* Search Form */}
      <SearchForm 
        search={filters.search}
        onSearchChange={filters.updateSearch}
        onSearch={loadTours}
      />

      <div className="page-layout">
        {/* Sidebar Filters */}
        <aside className="sidebar-filters">
          <Filters 
            filters={filters}
            onToggleFilter={toggleFilter}
            onMapClick={openMapModal}
          />
        </aside>

        {/* Main Content - Tours */}
        <main className="main-content">
          <div className="container" style={{ paddingLeft: 0 }}>
            <h2 className="section-title">
              Туры в Турцию: найдено {tours.length} предложений
            </h2>

            <div className="hot-tours-container">
              <div className="tours-slider" id="hot-tours-slider">
                {loading ? (
                  <div className="loading">Загрузка...</div>
                ) : tours.length === 0 ? (
                  <div className="empty-state">Ничего не найдено 😔</div>
                ) : (
                  tours.map(tour => (
                    <TourCard key={tour.id} tour={tour} />
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <AuthModal />
      <MapModal />
    </div>
  );
}