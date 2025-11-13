'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [downloading, setDownloading] = useState(false);
  const slidesRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      title: "How English Literature is Beneficial in Practical Life",
      subtitle: "Exploring the Real-World Impact",
      content: []
    },
    {
      title: "1. Enhanced Communication Skills",
      content: [
        "Literature exposes you to diverse writing styles and vocabularies",
        "Improves both written and verbal expression",
        "Helps articulate complex ideas clearly and persuasively",
        "Essential for professional emails, reports, and presentations"
      ]
    },
    {
      title: "2. Critical Thinking & Problem Solving",
      content: [
        "Analyzing characters and plots develops analytical skills",
        "Understanding motivations and consequences improves decision-making",
        "Recognizing patterns and themes enhances pattern recognition",
        "Applies to business strategy, conflict resolution, and daily challenges"
      ]
    },
    {
      title: "3. Empathy & Emotional Intelligence",
      content: [
        "Reading diverse perspectives builds understanding of human nature",
        "Develops ability to see situations from multiple viewpoints",
        "Strengthens interpersonal relationships and teamwork",
        "Crucial for leadership, customer service, and collaboration"
      ]
    },
    {
      title: "4. Cultural Awareness & Creativity",
      content: [
        "Exposure to different cultures and time periods broadens worldview",
        "Stimulates imagination and innovative thinking",
        "Provides historical context for modern issues",
        "Valuable in global business, marketing, and creative industries"
      ]
    }
  ];

  const downloadPDF = async () => {
    setDownloading(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1920, 1080]
      });

      const slideElements = slidesRef.current?.querySelectorAll('.slide');

      if (slideElements) {
        for (let i = 0; i < slideElements.length; i++) {
          const slide = slideElements[i] as HTMLElement;
          const canvas = await html2canvas(slide, {
            scale: 2,
            width: 1920,
            height: 1080,
            backgroundColor: '#ffffff'
          });

          const imgData = canvas.toDataURL('image/png');

          if (i > 0) {
            pdf.addPage();
          }

          pdf.addImage(imgData, 'PNG', 0, 0, 1920, 1080);
        }
      }

      pdf.save('english-literature-benefits.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <button
            onClick={downloadPDF}
            disabled={downloading}
            style={{
              backgroundColor: '#22c55e',
              color: 'white',
              border: 'none',
              padding: '15px 40px',
              fontSize: '18px',
              borderRadius: '8px',
              cursor: downloading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            {downloading ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>

        <div ref={slidesRef}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className="slide"
              style={{
                width: '1920px',
                height: '1080px',
                marginBottom: '20px',
                background: index % 2 === 0
                  ? 'linear-gradient(135deg, #22c55e 0%, #22c55e 25%, #ffffff 25%, #ffffff 50%, #22c55e 50%, #22c55e 75%, #ffffff 75%, #ffffff 100%)'
                  : 'linear-gradient(45deg, #ffffff 0%, #ffffff 25%, #22c55e 25%, #22c55e 50%, #ffffff 50%, #ffffff 75%, #22c55e 75%, #22c55e 100%)',
                backgroundSize: '80px 80px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                transform: 'scale(0.5)',
                transformOrigin: 'top left',
                marginLeft: '0'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '100px'
              }}>
                {index === 0 ? (
                  <>
                    <h1 style={{
                      fontSize: '96px',
                      color: '#22c55e',
                      marginBottom: '40px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      {slide.title}
                    </h1>
                    <p style={{
                      fontSize: '48px',
                      color: '#374151',
                      textAlign: 'center',
                      fontStyle: 'italic'
                    }}>
                      {slide.subtitle}
                    </p>
                  </>
                ) : (
                  <>
                    <h2 style={{
                      fontSize: '72px',
                      color: '#22c55e',
                      marginBottom: '60px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      borderBottom: '6px solid #22c55e',
                      paddingBottom: '20px'
                    }}>
                      {slide.title}
                    </h2>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      width: '100%',
                      maxWidth: '1400px'
                    }}>
                      {slide.content.map((item, idx) => (
                        <li key={idx} style={{
                          fontSize: '42px',
                          color: '#1f2937',
                          marginBottom: '40px',
                          paddingLeft: '60px',
                          position: 'relative',
                          lineHeight: '1.6'
                        }}>
                          <span style={{
                            position: 'absolute',
                            left: '0',
                            color: '#22c55e',
                            fontWeight: 'bold',
                            fontSize: '48px'
                          }}>
                            •
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
