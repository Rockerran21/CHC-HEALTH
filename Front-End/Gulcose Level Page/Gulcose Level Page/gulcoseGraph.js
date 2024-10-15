document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('glucoseChart').getContext('2d');
    const patientName = 'John Doe';
    const date = new Date().toISOString().split('T')[0];

    const url = `http://localhost:3000/patient-vitals/${encodeURIComponent(patientName)}/date/${date}`;

    // Helper function to parse blood pressure
    function parseBP(bpString) {
        if (bpString && typeof bpString === 'string' && bpString.includes('/')) {
            const [systolic, diastolic] = bpString.split('/').map(num => parseInt(num, 10));
            return { systolic, diastolic };
        } else {
            return { systolic: null, diastolic: null };
        }
    }

    // Helper function to calculate average
    function calculateAverage(arr) {
        const sum = arr.reduce((acc, val) => acc + val, 0);
        return sum / arr.length;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const bloodPressureData = data.map(vital => parseBP(vital.bp));
            const glucoseLevels = data.map(vital => ({ x: new Date(vital.date), y: vital.glucoseLevel }));
            const systolicBP = bloodPressureData.map((bp, index) => ({ x: new Date(data[index].date), y: bp.systolic }));
            const diastolicBP = bloodPressureData.map((bp, index) => ({ x: new Date(data[index].date), y: bp.diastolic }));
            const heartRates = data.map(vital => ({ x: new Date(vital.date), y: vital.heartRate }));

            const avgGlucose = calculateAverage(glucoseLevels.map(level => level.y));
            const avgSystolic = calculateAverage(systolicBP.map(bp => bp.y));
            const avgDiastolic = calculateAverage(diastolicBP.map(bp => bp.y));
            const avgHeartRate = calculateAverage(heartRates.map(rate => rate.y));



            document.getElementById('avgGlucose').textContent = avgGlucose.toFixed(1);
            document.getElementById('avgBloodPressure').textContent = `${avgSystolic.toFixed(1)}/${avgDiastolic.toFixed(1)}`;
            document.getElementById('avgHeartRate').textContent = avgHeartRate.toFixed(1);

            // Function to get color based on comparison
            function colorForValue(value, low, high) {
                if (value < low) return 'yellow'; // Low
                if (value > high) return 'red'; // High
                return 'green'; // Standard
            }

            // Update the text color based on the values
            const avgBloodPressureElement = document.getElementById('avgBloodPressure');
            avgBloodPressureElement.textContent = `${avgSystolic.toFixed(1)}/${avgDiastolic.toFixed(1)}`;
            avgBloodPressureElement.style.color = colorForValue(avgSystolic, 90, 120); // Using systolic for color

            const avgGlucoseElement = document.getElementById('avgGlucose');
            avgGlucoseElement.textContent = avgGlucose.toFixed(1);
            avgGlucoseElement.style.color = colorForValue(avgGlucose, 70, 99);

            const avgHeartRateElement = document.getElementById('avgHeartRate');
            avgHeartRateElement.textContent = avgHeartRate.toFixed(1);
            avgHeartRateElement.style.color = colorForValue(avgHeartRate, 60, 100);

            new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [
                        {
                            label: 'Glucose Level',
                            data: glucoseLevels,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        },
                        {
                            label: 'Systolic Blood Pressure',
                            data: systolicBP,
                            fill: false,
                            borderColor: 'rgb(255, 159, 64)',
                            tension: 0.1
                        },
                        {
                            label: 'Diastolic Blood Pressure',
                            data: diastolicBP,
                            fill: false,
                            borderColor: 'rgb(153, 102, 255)',
                            tension: 0.1
                        },
                        {
                            label: 'Heart Rate',
                            data: heartRates,
                            fill: false,
                            borderColor: 'rgb(54, 162, 235)',
                            tension: 0.1
                        }
                    ]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'hour',
                                tooltipFormat: 'HH:mm',
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            onClick: (e, legendItem, legend) => {
                                const index = legendItem.datasetIndex;
                                const ci = legend.chart;
                                if (ci.isDatasetVisible(index)) {
                                    ci.hide(index);
                                    legendItem.hidden = true;
                                } else {
                                    ci.show(index);
                                    legendItem.hidden = false;
                                }
                            },
                            display: true,
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error.message);
        });
});
