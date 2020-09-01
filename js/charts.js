/**
 * First Displayed Multi Traffic Chart
 */

// Get canvas of all chart options
const h_ctx = document.getElementById('hourlyTrafficChart').getContext('2d');
const d_ctx = document.getElementById('dailyTrafficChart').getContext('2d');
const w_ctx = document.getElementById('weeklyTrafficChart').getContext('2d');
const m_ctx = document.getElementById('monthlyTrafficChart').getContext('2d');

// Store options and canvas
const trafficOpts = {
    'hourly': h_ctx,
    'daily': d_ctx,
    'weekly': w_ctx,
    'monthly': m_ctx,
};

// Check the one to display
const defaultOpt = 'weekly';
let trafficOpt = defaultOpt;

if (supportsLocalStorage()) {
    try {
        // Get the user's previous setting
        if(localStorage.getItem('trafficOption')) {
            trafficOpt = localStorage.getItem('trafficOption');
        }
    } catch (error) {
        // If no previous setting, stay with the default value.
    }
} else {
    trafficOpt = defaultOpt;
}

// Create the first chart to display
createTraffic(trafficOpt);
const current_canvas = trafficOpts[`${trafficOpt}`];
current_canvas.canvas.style = 'block';

// Simulate a click on toggle swich if it oes not start with default option. 
if(trafficOpt !== defaultOpt) {
    const elementToClick = document.getElementById(trafficOpt).nextElementSibling;
    elementToClick.click();
}

// Hide other canvas
for (var prop in trafficOpts) {
    if (prop !== trafficOpt) {
        trafficOpts[`${prop}`].canvas.style.display = 'none';
    }
}

// Other hidden options are set to created later (after all other charts created).



/**
 * Daily Traffic chart (Bar)
 */

var daily_ctx = document.getElementById('dailyBarTrafficChart').getContext('2d');
const barColor = 'rgb(145, 163, 125)';
var dailyChart = new Chart(daily_ctx, {
    type: 'bar',
    data: {
        labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        datasets: [{
            label: '',
            data: [50, 80, 175, 125, 225, 200, 85],
            backgroundColor: [
                barColor,
                barColor,
                barColor,
                barColor,
                barColor,
                barColor,
                barColor,
            ],
        }]
    },
    options: {
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
               label: function(tooltipItem) {
                      return tooltipItem.yLabel;
               }
            }
        }
    }
});


/**
 * Mobile User Chart
 */
var mobile_user_ctx = document.getElementById('mobileUserDoughnutChart').getContext('2d');
var mobileUserDoughnutChart = new Chart(mobile_user_ctx, {
    type: 'doughnut',
    data: {
        labels: ['Phones', 'Tablets', 'Desktop'],
        datasets: [{
            label: '',
            data: [2400, 3000, 12000],
            backgroundColor: [
                'rgba(167, 197, 139)',
                'rgba(167, 180, 120)',
                'rgba(184, 190, 167, .3)'
            ]
        }]
    },
});

/**
 * Create Hidden Multi Traffic Charts
 */
for (var prop in trafficOpts) {
    if (prop !== trafficOpt) {
        createTraffic(prop);
    }
}


/**
 * Helper Methods
 */

function supportsLocalStorage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

/**
 * Traffic chart generation
 */
function createTraffic(type) {
    switch (type) {

        // Hourly chart
        case 'hourly':
            const h_chart = new Chart(h_ctx, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: ['12:00PM', '12:10PM', '12:20PM', '12:30PM', '12:40PM', '12:50PM'],
                    datasets: [{
                        backgroundColor: 'rgba(167, 197, 139, .3)',
                        borderColor: 'rgb(177, 207, 159)',
                        data: [42, 44, 65, 34, 33, 34, 56],
                        borderWidth: 2,
                        lineTension: 0
                    }],
                },

                options: {
                    legend: {
                        display: false
                    },
                    tooltips: {
                        callbacks: {
                           label: function(tooltipItem) {
                                  return tooltipItem.yLabel;
                           }
                        }
                    }
                }
            });
            break;


        // Daily chart
        case 'daily':
            const d_chart = new Chart(d_ctx, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: ['0AM', '3AM', '6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
                    datasets: [{
                        backgroundColor: 'rgba(167, 197, 139, .3)',
                        borderColor: 'rgb(177, 207, 159)',
                        data: [5, 1, 1, 12, 32, 68, 64, 41],
                        borderWidth: 2,
                        lineTension: 0
                    }],
                },

                options: {
                    legend: {
                        display: false
                    },
                    tooltips: {
                        callbacks: {
                           label: function(tooltipItem) {
                                  return tooltipItem.yLabel;
                           }
                        }
                    }
                }
            });
            break;

        // Weekly chart
        case 'weekly':
            const w_chart = new Chart(w_ctx, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                    datasets: [{
                        backgroundColor: 'rgba(167, 197, 139, .3)',
                        borderColor: 'rgb(177, 207, 159)',
                        data: [50, 74, 29, 49, 72, 80, 64],
                        borderWidth: 2,
                        lineTension: 0
                    }],
                },
                options: {
                    legend: {
                        display: false
                    },
                    tooltips: {
                        callbacks: {
                           label: function(tooltipItem) {
                                  return tooltipItem.yLabel;
                           }
                        }
                    }
                }
            });
            break;



        // Monthly chart

        case 'monthly':
            const m_chart = new Chart(m_ctx, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: ['16', '23', '30', '6', '13', '20', '27', '4', '11', '18', '25'],
                    datasets: [{
                        backgroundColor: 'rgba(167, 197, 139, .3)',
                        borderColor: 'rgb(177, 207, 159)',
                        data: [500, 700, 1000, 900, 700, 800, 720, 760, 700, 800, 900],
                        borderWidth: 2,
                        lineTension: 0
                    }],
                },
                options: {
                    legend: {
                        display: false
                    },
                    tooltips: {
                        callbacks: {
                           label: function(tooltipItem) {
                                  return tooltipItem.yLabel;
                           }
                        }
                    }
                }
            });
            break;

    }
}

