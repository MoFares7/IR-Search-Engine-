import React, { useState, useEffect } from 'react';
import './style.css';

const SliderComponent = ({ initialMinSalary, initialMaxSalary, setMinSalary, setMaxSalary }) => {
        // State variables for slider values
        const [minValue, setMinValue] = useState(initialMinSalary);
        const [maxValue, setMaxValue] = useState(initialMaxSalary);

        // Update the parent component's state when the slider values change
        useEffect(() => {
                setMinSalary(minValue);
                setMaxSalary(maxValue);
        }, [minValue, maxValue, setMinSalary, setMaxSalary]);

        // Function to handle changes in slider values
        const handleSliderChange = (event) => {
                const { name, value } = event.target;
                if (name === 'min') {
                        setMinValue(parseInt(value));
                } else {
                        setMaxValue(parseInt(value));
                }
        };

        return (
                <div className="card-conteiner">
                        <div className="card-content">
                                <div className="card-title">Salary <span>Determination</span></div>
                                <div className="values">
                                        <div><span id="first">{minValue}</span> DH</div> -
                                        <div><span id="second">{maxValue}</span> DH</div>
                                </div>
                                <small className="current-range">
                                        Current Salary:
                                        <div><span id="third">{minValue + maxValue}</span> DH</div>
                                </small>
                                <div className="rangeslider">
                                        <input
                                                className="min input-ranges"
                                                name="min"
                                                type="range"
                                                min="1"
                                                max="10000"
                                                value={minValue}
                                                onChange={handleSliderChange}
                                        />
                                        <input
                                                className="max input-ranges"
                                                name="max"
                                                type="range"
                                                min="1"
                                                max="10000"
                                                value={maxValue}
                                                onChange={handleSliderChange}
                                        />
                                </div>
                        </div>
                </div>
        );
};

export default SliderComponent;
