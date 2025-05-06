# Customizable Certificate Generator - Technical Demo Script

This script provides a technical walkthrough of the Customizable Certificate Generator project, highlighting the key components, architecture, and implementation details.

## Project Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd customizable-certificate
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Architecture Overview

The project follows a React component-based architecture with the following key parts:

1. **Context API** - Manages the global state of the certificate
2. **Component System** - Modular components for UI elements
3. **Drag and Drop** - Custom implementation for element placement
4. **PDF Export** - Client-side PDF generation

## Key Components Walkthrough

### 1. Certificate Context (`src/context/CertificateContext.jsx`)

The central state management system that stores:
- All certificate elements
- Background image
- Methods for adding, updating, and removing elements

```javascript
// Demonstrate by opening the file and explaining:
const CertificateContext = createContext();

export const CertificateProvider = ({ children }) => {
  const [elements, setElements] = useState([]);
  const [background, setBackground] = useState(null);
  
  // Methods for manipulating elements
  const addElement = (element) => {...}
  const updateElement = (id, updates) => {...}
  const removeElement = (id) => {...}
  const setBackgroundImage = (imageUrl) => {...}
}
```

### 2. Layout Component (`src/components/layout/Layout.jsx`)

Defines the overall application structure and handles drag and drop events:

```javascript
// Show the component structure:
return (
  <div className="flex flex-col h-screen">
    <Header />
    <div className="flex flex-1 overflow-hidden">
      <Sidebar onDragStart={handleDragStart} />
      <main className="flex-1 overflow-auto">
        {children || <Canvas />}
      </main>
    </div>
  </div>
);
```

### 3. Sidebar Component (`src/components/sidebar/Sidebar.jsx`)

Contains draggable text components defined in `sidebarItems.js`:

```javascript
// Demonstrate the drag start handler:
const handleDragStart = (event, item) => {
  event.dataTransfer.setData('text/plain', JSON.stringify(item));
  onDragStart(item);
};
```

### 4. Certificate Element (`src/components/certificate/CertificateElement.jsx`)

Handles the rendering, editing, and positioning of elements on the canvas:

```javascript
// Show the mouse event handlers:
const handleMouseDown = (e) => {...}
const handleMouseMove = (e) => {...}
const handleMouseUp = () => {...}
const handleDoubleClick = (e) => {...}
```

### 5. PDF Export (`src/utils/pdfExport.js`)

Handles the conversion of the certificate canvas to a PDF document:

```javascript
// Explain the export process:
export const exportCertificateAsPDF = async (
  canvasElement,
  filename = 'certificate.pdf',
  options = { paperSize: 'a4', orientation: 'landscape' }
) => {
  // Wait for images to load
  await waitForImagesLoaded(canvasElement);
  
  // Convert to canvas
  const canvas = await html2canvas(canvasElement, {...});
  
  // Create PDF
  const pdf = new jsPDF({...});
  
  // Add image to PDF
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  
  // Save PDF
  pdf.save(filename);
}
```

## Technical Demo Sequence

### 1. State Management Demo

1. Open the browser console
2. Add a few elements to the canvas
3. Inspect the Certificate Context state:
   ```javascript
   // In console:
   const context = document.querySelector('[data-reactroot]')._reactRootContainer._internalRoot.current.child.child.memoizedState.element.props.value;
   console.log(context.elements);
   ```
4. Show how elements are stored with their positions and content

### 2. Drag and Drop Implementation

1. Open the Layout.jsx file
2. Explain the custom drag and drop implementation:
   ```javascript
   // Show the handleDrop function:
   const handleDrop = (event) => {
     if (!draggedItem) return;
     
     const canvas = document.querySelector('.certificate-canvas-container');
     if (!canvas) return;
     
     const canvasRect = canvas.getBoundingClientRect();
     
     const x = event.clientX - canvasRect.left;
     const y = event.clientY - canvasRect.top;
     
     if (x >= 0 && x <= canvasRect.width && y >= 0 && y <= canvasRect.height) {
       addElement({
         id: uuidv4(),
         type: draggedItem.type,
         content: draggedItem.content,
         position: { x, y },
       });
     }
     
     setDraggedItem(null);
   };
   ```

### 3. Element Editing Demo

1. Add an element to the canvas
2. Double-click to edit it
3. Show the code in CertificateElement.jsx that handles editing:
   ```javascript
   const handleDoubleClick = (e) => {
     e.stopPropagation();
     setIsEditing(true);
     setIsSelected(true);
   };
   
   const handleInputChange = (e) => {
     setEditContent(e.target.value);
   };
   
   const handleBlur = () => {
     setIsEditing(false);
     updateElement(element.id, { content: editContent });
   };
   ```

### 4. Background Image Upload Demo

1. Click "Upload Background"
2. Select an image
3. Show the code in BackgroundUploader.jsx:
   ```javascript
   const handleFileChange = (e) => {
     const file = e.target.files[0];
     if (!file) return;
     
     if (!file.type.startsWith('image/')) {
       alert('Please upload an image file');
       return;
     }
     
     const imageUrl = URL.createObjectURL(file);
     setBackgroundImage(imageUrl);
     
     e.target.value = '';
   };
   ```

### 5. PDF Export Demo

1. Add elements to create a complete certificate
2. Click "Export PDF"
3. Configure export options
4. Generate the PDF
5. Show the code in pdfExport.js:
   ```javascript
   // Explain the key parts:
   // 1. Converting to canvas
   const canvas = await html2canvas(canvasElement, {...});
   
   // 2. Creating the PDF with proper dimensions
   const pdf = new jsPDF({
     orientation,
     unit: options.paperSize === 'custom' ? 'px' : 'mm',
     format
   });
   
   // 3. Adding the canvas image to the PDF
   const imgData = canvas.toDataURL('image/png');
   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
   
   // 4. Saving the PDF
   pdf.save(filename);
   ```

## Performance Considerations

1. **Image Handling**
   - The application uses `waitForImagesLoaded` to ensure all images are loaded before PDF export
   - Background images are loaded as object URLs for better performance

2. **Rendering Optimization**
   - Elements are only re-rendered when their properties change
   - The canvas uses a fixed size to prevent layout shifts

3. **PDF Generation**
   - PDF generation happens client-side without server requests
   - The html2canvas library is configured with a scale of 2 for better quality

## Extension Points

1. **Adding New Element Types**
   - Extend the `sidebarItems.js` file with new element types
   - Add rendering logic in the `renderElement` function in `CertificateElement.jsx`

2. **Supporting Additional Export Formats**
   - Create new export functions in the `pdfExport.js` file
   - Add UI options in the Header component

3. **Implementing Templates**
   - Create predefined arrangements of elements
   - Add a template selection UI in the sidebar

## Conclusion

This technical demo showcases the key features and implementation details of the Customizable Certificate Generator. The project demonstrates:

1. React component architecture
2. Custom drag and drop implementation
3. Client-side PDF generation
4. Image handling and manipulation
5. State management with Context API

The modular design allows for easy extension and customization to meet various certificate generation needs.
