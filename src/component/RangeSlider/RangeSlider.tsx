import MultiRangeSlider from "multi-range-slider-react";
import "./RangeSlider.css";
import { SliderChangeEvent } from "../FilterwithSalary/FilterwithSalary";
type RangeSlider = {
  rangeMinValue: number;
  rangeMaxValue: number;
  handleInput: (e: SliderChangeEvent) => void;
};
const RangeSlider: React.FC<RangeSlider> = ({
  rangeMinValue,
  rangeMaxValue,
  handleInput,
}) => {
  return (
    <div>
      <h4 className="text-sm">
        <span>
          Min:<b> {rangeMinValue}k</b>
        </span>{" "}
        -{" "}
        <span>
          Max:<b> {rangeMaxValue}k</b>
        </span>
      </h4>
      <MultiRangeSlider
        min={0}
        className="myRangeSlider"
        ruler={false}
        max={150}
        step={2}
        minValue={rangeMinValue}
        maxValue={rangeMaxValue}
        barLeftColor="#05547f"
        barInnerColor="#28bdfd"
        barRightColor="#05547f"
        thumbLeftColor="#fff"
        thumbRightColor="#fff"
        label="false"
        onInput={(e) => {
          handleInput(e);
        }}
      />
    </div>
  );
};

export default RangeSlider;
