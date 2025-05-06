import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const waitForImagesLoaded = async (element) => {
  // Wait for all images and canvases to load
  const images = Array.from(element.querySelectorAll('img, canvas'));

  return Promise.all(
    images.map(
      (img) =>
        new Promise((resolve) => {
          if (img.tagName.toLowerCase() === 'canvas' || img.complete) {
            resolve();
          } else {
            img.onload = resolve;
            img.onerror = resolve; // Continue even if image fails to load
          }
        })
    )
  );
};

export const exportCertificateAsPDF = async (
  canvasElement,
  filename = 'certificate.pdf',
  options = { paperSize: 'a4', orientation: 'landscape' }
) => {
  if (!canvasElement) {
    console.error('Canvas element not found');
    return;
  }

  try {
    await waitForImagesLoaded(canvasElement);

    // No special handling needed for PDF backgrounds anymore
    // Since PDFs are now rendered as images

    const canvas = await html2canvas(canvasElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: 'white',
      logging: false,
      imageTimeout: 15000,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.querySelector('.certificate-canvas-container');
        if (clonedElement) {
          // Make sure all elements are visible
          clonedElement.querySelectorAll('*').forEach((el) => {
            if (el.style.display === 'none') {
              el.style.display = 'block';
            }
          });
        }
      }
    });

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    let pdfWidth, pdfHeight, format;
    const orientation = options.orientation || 'landscape';

    switch (options.paperSize) {
      case 'letter':
        format = 'letter';
        pdfWidth = orientation === 'landscape' ? 279.4 : 215.9;
        pdfHeight = orientation === 'landscape' ? 215.9 : 279.4;
        break;
      case 'custom':
        format = [canvasWidth, canvasHeight];
        pdfWidth = canvasWidth;
        pdfHeight = canvasHeight;
        break;
      case 'a4':
      default:
        format = 'a4';
        pdfWidth = orientation === 'landscape' ? 297 : 210;
        pdfHeight = orientation === 'landscape' ? 210 : 297;
        break;
    }

    const pdf = new jsPDF({
      orientation,
      unit: options.paperSize === 'custom' ? 'px' : 'mm',
      format
    });

    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
  } catch (error) {
    console.error('Error exporting certificate as PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};
