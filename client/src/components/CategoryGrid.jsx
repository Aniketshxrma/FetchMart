import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

export const CategoryGrid = ({ selectedCategory, onSelectCategory }) => {
  const categories = [
    {
      id: 'Electronics',
      name: 'Electronics',
      count: '1,200+ Items',
      image: '/assets/cat_electronics.jpg',
      tag: 'Tech Deals',
    },
    {
      id: 'Fashion',
      name: 'Fashion',
      count: '3,450+ Items',
      image: '/assets/cat_fashion.jpg',
      tag: 'Trending',
    },
    {
      id: 'Beauty',
      name: 'Beauty',
      count: '850+ Items',
      image: '/assets/cat_beauty.jpg',
      tag: 'Self Care',
    },
    {
      id: 'Home',
      name: 'Home',
      count: '2,100+ Items',
      image: '/assets/cat_home.jpg',
      tag: 'Living',
    },
    {
      id: 'Fitness',
      name: 'Fitness',
      count: '640+ Items',
      image: '/assets/cat_fitness.jpg',
      tag: 'Active',
    },
  ];

  return (
    <section style={{ padding: '60px 0 30px' }} id="categories-section">
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '32px',
        }}>
          <div>
            <div style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#FF6B00',
              marginBottom: '6px',
            }}>
              Curated Collections
            </div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: '#061224',
              letterSpacing: '-0.02em',
            }}>
              Explore Top Categories
            </h2>
          </div>

          <button
            onClick={() => onSelectCategory('All')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#FF6B00',
              fontWeight: 700,
              fontSize: '0.92rem',
            }}
          >
            <span>View All</span>
            <ChevronRight size={18} />
          </button>
        </div>

        {/* 5-Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '20px',
        }} className="categories-grid">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid #FF6B00' : '1.5px solid #F1F5F9',
                  boxShadow: isSelected ? '0 12px 30px -4px rgba(255, 107, 0, 0.25)' : '0 4px 16px -2px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 16px 36px -6px rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = isSelected ? 'translateY(-2px)' : 'translateY(0)';
                  e.currentTarget.style.boxShadow = isSelected ? '0 12px 30px -4px rgba(255, 107, 0, 0.25)' : '0 4px 16px -2px rgba(0, 0, 0, 0.05)';
                }}
              >
                {/* Category Image Box */}
                <div style={{
                  width: '100%',
                  height: '210px',
                  overflow: 'hidden',
                  background: '#F8FAFC',
                  position: 'relative',
                }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />

                  {/* Badge */}
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(8px)',
                    color: '#0F172A',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                  }}>
                    {cat.tag}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: '#061224',
                      marginBottom: '2px',
                    }}>
                      {cat.name}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 500 }}>
                      {cat.count}
                    </div>
                  </div>

                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isSelected ? '#FF6B00' : '#F1F5F9',
                    color: isSelected ? '#FFFFFF' : '#64748B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}>
                    <ArrowRight size={15} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
