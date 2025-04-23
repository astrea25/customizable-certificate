import React, { useEffect, useRef } from 'react';
import { useCertificate } from '../../context/CertificateContext';

const CertificateElement = ({ element }) => {
  const { updateElement, removeElement } = useCertificate();
  const elementRef = useRef(null);

  useEffect(() => {
    console.log(`Element rendered: ${element.id}`, element);
  }, [element]);

  const style = {
    position: 'absolute',
    left: `${element.position.x}px`,
    top: `${element.position.y}px`,
    cursor: 'move',
    zIndex: 20,
    pointerEvents: 'auto', // Enable pointer events for the dragged elements
  };

  const renderElement = () => {
    switch (element.type) {
      case 'h1':
        return <h1 className="text-8xl font-black tracking-wider text-black">{element.content}</h1>;
      case 'h2':
        return <h2 className="text-6xl font-bold tracking-wider text-black">{element.content}</h2>;
      case 'h3':
        return <h3 className="text-4xl font-bold tracking-wider text-black">{element.content}</h3>;
      case 'h4':
        return <h4 className="text-3xl font-bold tracking-wider text-black">{element.content}</h4>;
      case 'h5':
        return <h5 className="text-2xl font-bold tracking-wider text-black">{element.content}</h5>;
      case 'h6':
        return <h6 className="text-xl font-bold tracking-wider text-black">{element.content}</h6>;
      case 'p-regular':
        return <p className="text-base text-black">{element.content}</p>;
      case 'p-small':
        return <p className="text-sm text-black">{element.content}</p>;
      case 'p-xs':
        return <p className="text-xs text-black">{element.content}</p>;
      case 'p-large':
        return <p className="text-lg text-black">{element.content}</p>;
      case 'p-xl':
        return <p className="text-xl text-black">{element.content}</p>;
      case 'p-bold':
        return <p className="font-bold text-black">{element.content}</p>;
      case 'p-italic':
        return <p className="italic text-black">{element.content}</p>;
      case 'p-underline':
        return <p className="underline text-black">{element.content}</p>;
      case 'p-strike':
        return <p className="line-through text-black">{element.content}</p>;
      case 'p-color':
        return <p className="text-blue-600">{element.content}</p>;
      default:
        return <p className="text-black">{element.content}</p>;
    }
  };

  return (
    <div
      ref={elementRef}
      style={style}
      className="draggable-element absolute"
      onDoubleClick={() => console.log('Double clicked element:', element)}
    >
      {renderElement()}
    </div>
  );
};

export default CertificateElement;
