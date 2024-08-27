import React, { useState, useRef, useEffect } from "react";
import { fabric } from "fabric";
import ImageGallery from "./ImageGallery";
import { buttonConfig } from "../utils/constant";

const Images = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (selectedImage && showModal) {
      initCanvas(selectedImage);
    }
  }, [selectedImage, showModal]);

  const handleAddCaptionClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const initCanvas = (imageUrl) => {
    const canvas = new fabric.Canvas("canvas", {
      width: 600,
      height: 400,
    });

    fabric.Image.fromURL(
      imageUrl,
      (img) => {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const imgAspectRatio = img.width / img.height;
        const canvasAspectRatio = canvasWidth / canvasHeight;

        let newWidth, newHeight;

        if (imgAspectRatio > canvasAspectRatio) {
          newWidth = canvasWidth;
          newHeight = canvasWidth / imgAspectRatio;
        } else {
          newHeight = canvasHeight;
          newWidth = canvasHeight * imgAspectRatio;
        }

        img.set({
          left: (canvasWidth - newWidth) / 2,
          top: (canvasHeight - newHeight) / 2,
          width: newWidth,
          height: newHeight,
          selectable: false,
        });

        canvas.add(img);
        canvas.sendToBack(img);
      },
      { crossOrigin: "anonymous" }
    );

    canvasRef.current = canvas;
  };

  const addText = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const text = new fabric.Textbox("Edit Me", {
        left: 50,
        top: 50,
        width: 200,
        fontSize: 20,
        fill: "#000000",
        editable: true,
      });
      canvas.add(text);
    }
  };

  const addShape = (shapeType) => {
    const canvas = canvasRef.current;
    if (canvas) {
      let shape;

      switch (shapeType) {
        case "rectangle":
          shape = new fabric.Rect({
            left: 100,
            top: 100,
            width: 100,
            height: 60,
            fill: "rgba(255,0,0,0.5)",
          });
          break;
        case "circle":
          shape = new fabric.Circle({
            left: 150,
            top: 150,
            radius: 50,
            fill: "rgba(0,255,0,0.5)",
          });
          break;
        case "triangle":
          shape = new fabric.Triangle({
            left: 200,
            top: 200,
            width: 100,
            height: 100,
            fill: "rgba(0,0,255,0.5)",
          });
          break;
        default:
          return;
      }
      canvas.add(shape);
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL({
        format: "png",
        quality: 1,
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "image-with-captions.png";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleButtonClick = (action, shapeType) => {
    switch (action) {
      case "addText":
        addText();
        break;
      case "addShape":
        addShape(shapeType);
        break;
      case "downloadImage":
        downloadImage();
        break;
      default:
        break;
    }
  };

  return (
    <>
      {images.length > 1 ? (
        <ImageGallery
          images={images}
          onAddCaptionClick={handleAddCaptionClick}
        />
      ) : (
        <div className="text-center p-4 text-gray-500">Search</div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <canvas id="canvas" className="border mb-4"></canvas>
            <div className="flex justify-between my-4">
              {buttonConfig.map((btn, index) => (
                <button
                  key={index}
                  onClick={() => handleButtonClick(btn.action, btn.shapeType)}
                  className={`${btn.color} text-white py-2 px-4 rounded-lg`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Images;
