# Customizable Certificate Generator - Feature Showcase Script

## Introduction

Welcome to the Customizable Certificate Generator! This application allows you to create professional-looking certificates with a simple drag-and-drop interface. This script will guide you through all the features of the application.

## Setup

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to the local development URL (typically http://localhost:5173)

## Feature 1: Certificate Canvas and Layout

The application has a clean, intuitive layout with three main sections:
- Header: Contains the application title and action buttons
- Sidebar: Contains text components that can be dragged onto the certificate
- Canvas: The main area where you design your certificate

**Demonstration:**
1. Point out the three main sections of the application
2. Explain that the canvas represents an A4 page in landscape orientation
3. Note that the canvas has a white background by default

## Feature 2: Drag and Drop Text Components

The sidebar contains various text components that can be dragged onto the certificate canvas.

**Demonstration:**
1. Click and drag a "Heading 1" component from the sidebar onto the canvas
2. Place it near the top center of the certificate
3. Drag a "Regular Text" component and place it below the heading
4. Drag a "Small Text" component and place it at the bottom of the certificate

**How it works:**
- Components in the sidebar are defined in `sidebarItems.js`
- When you drag a component, the `handleDragStart` function in `Sidebar.jsx` is triggered
- When you drop it on the canvas, the `handleDrop` function in `Layout.jsx` adds the element to the certificate context
- The element is then rendered on the canvas through the `CertificateElement` component

## Feature 3: Editing Text Components

All text components on the canvas can be edited to customize your certificate.

**Demonstration:**
1. Double-click on the "Heading 1" component you added
2. Change the text to "Certificate of Achievement"
3. Press Enter to save the changes
4. Double-click on the "Regular Text" component
5. Change it to "This certifies that [Name] has successfully completed [Course]"
6. Press Enter to save

**How it works:**
- Double-clicking an element triggers the `handleDoubleClick` function in `CertificateElement.jsx`
- This switches the element to edit mode by setting `isEditing` to true
- The element is replaced with an input field that allows you to change the text
- When you press Enter or click outside, the `handleBlur` function saves the changes

## Feature 4: Moving Elements

Elements can be freely positioned anywhere on the certificate canvas.

**Demonstration:**
1. Click and hold on the "Certificate of Achievement" heading
2. Drag it to reposition it at the top center of the certificate
3. Similarly, reposition the other text elements to create a balanced layout

**How it works:**
- Clicking on an element triggers the `handleMouseDown` function in `CertificateElement.jsx`
- As you drag, the `handleMouseMove` function updates the element's position
- The position is stored in the element's state and managed by the Certificate Context

## Feature 5: Deleting Elements

Unwanted elements can be easily removed from the certificate.

**Demonstration:**
1. Click on an element to select it
2. Notice the delete button (×) that appears in the top-right corner
3. Click the delete button to remove the element from the canvas

**How it works:**
- When an element is selected, a delete button is rendered
- Clicking the button triggers the `removeElement` function from the Certificate Context
- This removes the element from the elements array, causing it to disappear from the canvas

## Feature 6: Background Image Upload

You can customize your certificate with a background image.

**Demonstration:**
1. Click the "Upload Background" button in the header
2. Select an image file from your computer
3. Observe how the image becomes the background of your certificate
4. To remove the background, click the "Clear Background" button

**How it works:**
- The `BackgroundUploader` component handles image uploads
- When you select a file, it creates an object URL and passes it to the `setBackgroundImage` function
- The background image is then displayed in the `CertificateTemplate` component
- The image is sized to cover the entire certificate canvas

## Feature 7: PDF Export

Once you've designed your certificate, you can export it as a PDF.

**Demonstration:**
1. Click the "Export PDF" button in the header
2. In the export options dialog:
   - Enter a filename (e.g., "achievement-certificate")
   - Select a paper size (A4, Letter, or Custom)
   - Choose an orientation (Landscape or Portrait)
3. Click "Export" to generate and download the PDF

**How it works:**
- The export process is handled by the `exportCertificateAsPDF` function in `pdfExport.js`
- It uses html2canvas to capture the certificate canvas as an image
- Then it uses jsPDF to create a PDF document with the captured image
- The PDF is automatically downloaded to your computer

## Feature 8: Styling Text

The sidebar offers various text styling options.

**Demonstration:**
1. Drag a "Bold Text" component onto the canvas
2. Drag an "Italic Text" component onto the canvas
3. Drag an "Underlined Text" component onto the canvas
4. Drag a "Colored Text" component onto the canvas
5. Position them as desired

**How it works:**
- Each styled text component has a specific CSS class applied to it
- The styling is defined in the `getElementClass` function in `CertificateElement.jsx`
- This allows for consistent styling across the certificate

## Feature 9: Creating a Complete Certificate

Let's put everything together to create a complete certificate.

**Demonstration:**
1. Upload a decorative background image
2. Add a large heading at the top: "Certificate of Achievement"
3. Add a subheading: "This certifies that"
4. Add a larger text for the name: "[Participant Name]"
5. Add regular text: "has successfully completed the course"
6. Add larger text for the course name: "[Course Name]"
7. Add small text at the bottom for the date: "Awarded on [Date]"
8. Position all elements appropriately
9. Export the certificate as a PDF

## Conclusion

This concludes our showcase of the Customizable Certificate Generator. The application provides a simple yet powerful way to create professional certificates with:
- Drag and drop functionality
- Text editing and positioning
- Background image customization
- PDF export capabilities

Feel free to experiment with different layouts, text styles, and background images to create the perfect certificate for your needs!
