import React, { RefObject, createRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { connect } from 'react-redux';
import { WheelCanvasStyle } from './styles';
import { WheelData } from '../Wheel/types';
import { clamp } from '../../utils';
import { setArray } from '../../../../redux/game-reducer/actions';


const drawWheel = (
  canvasRef: RefObject<HTMLCanvasElement>,
  drawWheelProps,
) => {

  /* eslint-disable prefer-const */
  let {
    data,
    outerBorderColor,
    outerBorderWidth,
    innerRadius,
    innerBorderColor,
    innerBorderWidth,
    radiusLineColor,
    radiusLineWidth,
    fontSize,
    perpendicularText,
    textDistance
  } = drawWheelProps;
  const QUANTITY = data.length;
  const { numArray } = drawWheelProps;
  /* eslint-enable prefer-const */

  outerBorderWidth *= 2;
  innerBorderWidth *= 2;
  radiusLineWidth *= 2;
  fontSize *= 2;
  const canvas = canvasRef.current;
  if (canvas?.getContext('2d')) {
    const ctx = canvas.getContext('2d', { alpha: false }) as CanvasRenderingContext2D;


    const dpr = window.devicePixelRatio;
    const rect = canvas.getBoundingClientRect();

    // Set the "actual" size of the canvas
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Scale the context to ensure correct drawing operations


    // Set the "drawn" size of the canvas
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;


    if (numArray.length == 0) {
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, 500, 500);
    }
    ctx.filter = "brightness(150%)";
    ctx.lineWidth = 0;
    // ctx.translate(0.5, 0.5)

    const arc = Math.PI / (QUANTITY / 2);
    const startAngle = 0;
    const outsideRadius = canvas.width / 2 - 10;

    const clampedTextDistance = clamp(0, 100, textDistance);
    const textRadius = (outsideRadius * clampedTextDistance) / 100;

    const clampedInsideRadius = clamp(0, 100, innerRadius);
    const insideRadius = (outsideRadius * clampedInsideRadius) / 100;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.font = `bold ${fontSize}px Helvetica, Arial`;

    for (let i = 0; i < data.length; i++) {
      const angle = startAngle + i * arc;
      const { style, option } = data[i];
      ctx.fillStyle = (style && style.backgroundColor) as string;
      ctx.beginPath();

      ctx.filter = "brightness(60%)";
      if (numArray.indexOf(Number(option)) != -1) {
        ctx.fillStyle = '#ff8000'
      }
      ctx.arc(centerX, centerY, outsideRadius, angle, angle + arc, false);
      ctx.arc(centerX, centerY, insideRadius, angle + arc, angle, true);

      ctx.stroke();
      ctx.fill();

      ctx.save();


      ctx.beginPath();

      ctx.filter = "brightness(100%)";
      ctx.arc(centerX, centerY, outsideRadius, angle, angle + arc, false);
      ctx.arc(centerX, centerY, insideRadius + 50, angle + arc, angle, true);

      ctx.stroke();
      ctx.fill();

      ctx.save();



      // WHEEL RADIUS LINES
      ctx.strokeStyle = radiusLineWidth <= 0 ? 'transparent' : radiusLineColor;
      ctx.lineWidth = radiusLineWidth;
      for (let j = 0; j < data.length; j++) {
        const radiusAngle = startAngle + j * arc;
        ctx.beginPath();
        ctx.moveTo(
          centerX + (insideRadius + 1) * Math.cos(radiusAngle),
          centerY + (insideRadius + 1) * Math.sin(radiusAngle)
        );
        ctx.lineTo(
          centerX + (outsideRadius - 1) * Math.cos(radiusAngle),
          centerY + (outsideRadius - 1) * Math.sin(radiusAngle)
        );
        ctx.closePath();
        ctx.stroke();
      }

      // WHEEL OUTER BORDER
      ctx.strokeStyle =
        outerBorderWidth <= 0 ? 'transparent' : outerBorderColor;
      ctx.lineWidth = outerBorderWidth;
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        outsideRadius - ctx.lineWidth / 2,
        0,
        2 * Math.PI
      );
      ctx.closePath();
      ctx.stroke();

      // WHEEL INNER BORDER
      ctx.strokeStyle =
        innerBorderWidth <= 0 ? 'transparent' : innerBorderColor;
      ctx.lineWidth = innerBorderWidth;
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        insideRadius + ctx.lineWidth / 2 - 1,
        0,
        2 * Math.PI
      );
      ctx.closePath();
      ctx.stroke();

      // TEXT FILL
      ctx.fillStyle = (style && style.textColor) as string;
      ctx.translate(
        centerX + Math.cos(angle + arc / 2) * textRadius,
        centerY + Math.sin(angle + arc / 2) * textRadius
      );
      const text = data[i].option;
      const textRotationAngle = perpendicularText
        ? angle + arc / 2 + Math.PI / 2
        : angle + arc / 2;
      ctx.rotate(textRotationAngle);
      ctx.fillText(text, -ctx.measureText(text).width / 2, fontSize / 2.7);
      ctx.restore();
    }
  }
};

const WheelCanvas = ({
  gameData
}): JSX.Element => {

  const dispatch = useAppDispatch();
  const canvasRef = createRef<HTMLCanvasElement>();

  useEffect(() => {
    drawWheel(canvasRef, gameData);
  }, [canvasRef, gameData]);
  return <WheelCanvasStyle ref={canvasRef} width={gameData.width} height={gameData.height} />;
};
const mapStateToProps = (state) => ({
  gameData: state.gameReducer
})

const mapDispatchToProps = {
  ButtonClick: setArray
}

export default connect(mapStateToProps, mapDispatchToProps)(WheelCanvas);
