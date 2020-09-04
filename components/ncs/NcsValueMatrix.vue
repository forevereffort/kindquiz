<template>
  <div class="value-matrix">
    <div class="left-col">
      <div class="title mb-6">Individual Value Matrix</div>
      <p class="body-2">
        The bar chart shows the
        different value dimensions
        for this stakeholder. The
        higher the bar, the greater
        the emphasis on this
        particular value for the
        stakeholder. 
      </p>
      <p class="body-2">
        The comparison shows the
        congruence and gaps
        between this stakeholder
        and the organization's stated
        values, and this individual
        with the cohort.
      </p>
    </div>
    <div class="right-col">
      <div class="graph-area">
        <ClientOnly placeholder="Loading...">
          <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NcsValueMatrix',
  components: {
    Apexcharts: () => import('apexcharts'),
  },
  methods: {
  },
  props: ['pageData', 'series'],
  computed: {
  },
  data() {
    return {
      chartOptions: {
        colors: ['#736c62', '#b7b8b9', '#fac637'],
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false,
            // offsetX: 0,
            // offsetY: 0,
            tools: {
              download: false,
              // selection: true,
              // zoom: true,
              // zoomin: true,
              // zoomout: true,
              // pan: true,
              // reset: true | '<img src="/static/icons/reset.png" width="20">',
              // customIcons: []
            },
            // autoSelected: 'zoom' 
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Agility', 'Disruption', 'Empathy', 'Innovation', 'Integrity'],
        },
        yaxis: {
          title: {
            text: 'Score'
          },
          max: 7,
          min: 0,
          type: 'numeric',
          tickAmount: 7
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val
            }
          }
        }
      },
    }
  }
}
</script>

<style lang="scss" scoped>
.value-matrix {
  
  flex-direction: column;
  border: 2px solid #FFC719;
  border-radius: 12px;

  display: flex;

  .graph-area {
    
  }
}

@media (min-width: 800px) {
  .value-matrix {
    border-radius: 30px;

  }
}

@media (min-width: 1200px) {
  .value-matrix {
    flex-direction: row;

    .left-col {
      flex: 1;
      margin-right: 20px;
    }

    .right-col {
      width: 400px;
    }
  }
}
</style>
