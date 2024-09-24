// Loading the Google Charts library
google.charts.load('current', { 'packages': ['corechart'] });

function userInputs() {
    const chartType = document.getElementById('chartType').value;
    const inputsDiv = document.getElementById('inputs');
    inputsDiv.innerHTML = ''; // Clear existing inputs

    if (chartType === 'pie') {
        inputsDiv.innerHTML = `
            <label>Title: <input type="text" id="chartTitle" class="form-control" /></label><br>
            <label>Number of Sectors: <input type="number" id="numSectors" class="form-control" min="2" max="6" onchange="updatePieInputs()" /></label><br>
            <div id="sectorInputs"></div>
        `;
    } else if (chartType === 'bar') {
        inputsDiv.innerHTML = `
            <label>Title: <input type="text" id="chartTitle" class="form-control" /></label><br>
            <label>Number of Bars: <input type="number" id="numBars" class="form-control" min="2" max="6" onchange="updateBarInputs()" /></label><br>
            <label>Y-Axis Label: <input type="text" id="yAxisLabel" class="form-control" /></label><br>
            <label>Gridline Interval: <input type="number" id="gridlineInterval" class="form-control" min="10" max="100" /></label><br>
            <div id="barInputs"></div>
        `;
    }
}

function updatePieInputs() {
    const numSectors = document.getElementById('numSectors').value;
    const sectorInputsDiv = document.getElementById('sectorInputs');
    sectorInputsDiv.innerHTML = '';

    for (let i = 1; i <= numSectors; i++) {
        sectorInputsDiv.innerHTML += `
            <label>Sector ${i} Label: <input type="text" id="sectorLabel${i}" class="form-control" /></label><br>
            ${i < numSectors ? `<label>Sector ${i} Value: <input type="number" id="sectorValue${i}" class="form-control" /></label><br>` : ''}
        `;
    }
}

function updateBarInputs() {
    const numBars = document.getElementById('numBars').value;
    const barInputsDiv = document.getElementById('barInputs');
    barInputsDiv.innerHTML = '';

    for (let i = 1; i <= numBars; i++) {
        barInputsDiv.innerHTML += `
            <label>Bar ${i} Label: <input type="text" id="barLabel${i}" class="form-control" /></label><br>
            <label>Bar ${i} Value: <input type="number" id="barValue${i}" class="form-control" max="400" /></label><br>
        `;
    }
}

function generateChart() {
    const chartType = document.getElementById('chartType').value;
    const chartTitle = document.getElementById('chartTitle').value;

    // Set the title in the h2 element
    document.getElementById('chartTitleHeader').textContent = chartTitle;

    if (chartType === 'pie') {
        const numSectors = document.getElementById('numSectors').value;
        const data = [['Label', 'Value']];
        let totalValue = 0;

        for (let i = 1; i < numSectors; i++) {
            const label = document.getElementById(`sectorLabel${i}`).value;
            const value = parseFloat(document.getElementById(`sectorValue${i}`).value);
            data.push([label, value]);
            totalValue += value;
        }

        const lastLabel = document.getElementById(`sectorLabel${numSectors}`).value;
        data.push([lastLabel, 100 - totalValue]); // Assuming total value is 100 for simplicity

        const dataTable = google.visualization.arrayToDataTable(data);

        const options = {
            title: chartTitle,
            is3D: true,
            chartArea: { width: '90%', height: '75%' },
            legend: { position: 'bottom' }
        };

        const chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(dataTable, options);

    } else if (chartType === 'bar') {
        const numBars = document.getElementById('numBars').value;
        const yAxisLabel = document.getElementById('yAxisLabel').value;
        const gridlineInterval = parseFloat(document.getElementById('gridlineInterval').value);
        const data = [['Label', yAxisLabel]];

        for (let i = 1; i <= numBars; i++) {
            const label = document.getElementById(`barLabel${i}`).value;
            const value = parseFloat(document.getElementById(`barValue${i}`).value);
            data.push([label, value]);
        }

        const dataTable = google.visualization.arrayToDataTable(data);

        const options = {
            title: chartTitle,
            hAxis: { title: 'Labels' },
            vAxis: { title: yAxisLabel, gridlines: { count: Math.ceil(400 / gridlineInterval) } },
            chartArea: { width: '70%', height: '75%' },
            legend: { position: 'bottom' }
        };

        const chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(dataTable, options);
    }
}
