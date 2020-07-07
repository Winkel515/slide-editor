<template>
  <div id="Flow">
    <div v-if="mode !== 'preview'" class="graphs-title">
      <span id="text-flow_title">{{ flow_title }}</span>
    </div>
    <div id="gauge">
      <svg :id="flowId"></svg>
    </div>
    <div v-if="mode !== 'preview'" class="graphs-status">
      <p>
        <span class="digits">0</span>
        &nbsp;
        <span id="text-flow_status">{{ flow_status }}</span>
      </p>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import en from '../i18n/en.json';

export default {
  props: {
    mode: String,
  },
  data() {
    return {
      flow_title: en.flow_title,
      flow_status: en.flow_status_suffix_plural,
    };
  },
  beforeCreate() {
    this.flowId = `E${this._uid}`;
  },
  mounted() {
    const flowGauge = gauge(`#${this.flowId}`, {
      size: 300,
      ringWidth: 60,
      maxValue: 3,
      transitionMs: 700,
    });

    flowGauge.render();

    function gauge(container, configuration) {
      var that = {};
      var config = {
        size: 200,
        ringInset: 20,
        ringWidth: 20,

        pointerWidth: 10,
        pointerTailLength: 5,
        pointerHeadLengthPercent: 0.9,

        minValue: 0,
        maxValue: 10,

        minAngle: -90,
        maxAngle: 90,

        transitionMs: 750,

        majorTicks: 3,
      };
      var range = undefined;
      var r = undefined;
      var pointerHeadLength = undefined;

      var svg = undefined;
      var arc = undefined;
      var scale = undefined;
      var ticks = undefined;
      var tickData = undefined;
      var pointer = undefined;
      var currentFlow = null;

      function deg2rad(deg) {
        return (deg * Math.PI) / 180;
      }

      function newAngle(d) {
        var ratio = scale(d);
        var newAngle = config.minAngle + ratio * range;
        return newAngle;
      }

      function configure(configuration) {
        var prop = undefined;
        for (prop in configuration) {
          config[prop] = configuration[prop];
        }

        range = config.maxAngle - config.minAngle;
        r = config.size / 2;
        pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

        // a linear scale that maps domain values to a percent from 0..1
        scale = d3.scale
          .linear()
          .range([0, 1])
          .domain([config.minValue, config.maxValue]);

        ticks = scale.ticks(config.majorTicks);
        tickData = d3.range(config.majorTicks).map(function() {
          return 1 / config.majorTicks;
        });

        arc = d3.svg
          .arc()
          .innerRadius(r - config.ringWidth - config.ringInset)
          .outerRadius(r - config.ringInset)
          .startAngle(function(d, i) {
            var ratio = d * i;
            return deg2rad(config.minAngle + ratio * range);
          })
          .endAngle(function(d, i) {
            var ratio = d * (i + 1);
            return deg2rad(config.minAngle + ratio * range);
          });
      }
      that.configure = configure;

      function centerTranslation() {
        return 'translate(' + r + ',' + r + ')';
      }

      function isRendered() {
        return svg !== undefined;
      }
      that.isRendered = isRendered;

      function render(newValue) {
        svg = d3
          .select(container)
          .attr('class', 'gauge')
          .attr('viewBox', '0 0 300 175');

        var centerTx = centerTranslation();

        var arcs = svg
          .append('g')
          .attr('class', 'arc')
          .attr('transform', centerTx);

        arcs
          .selectAll('path')
          .data(tickData)
          .enter()
          .append('path')
          .attr('fill', function(d, i) {
            return [d3.rgb('#CE1C0E'), d3.rgb('#D8B32F'), d3.rgb('#2D882D')][i];
          })
          .attr('d', arc);

        var lineData = [
          [config.pointerWidth / 2, 0],
          [0, -pointerHeadLength],
          [-(config.pointerWidth / 2), 0],
          [0, config.pointerTailLength],
          [config.pointerWidth / 2, 0],
        ];
        var pointerLine = d3.svg.line().interpolate('monotone');
        var pg = svg
          .append('g')
          .data([lineData])
          .attr('class', 'pointer')
          .attr('transform', centerTx);

        pointer = pg
          .append('path')
          .attr('d', pointerLine /*function(d) { return pointerLine(d) +'Z';}*/)
          .attr('transform', 'rotate(' + config.minAngle + ')');

        update(newValue === undefined ? 0 : newValue);
      }
      that.render = render;

      function update(newValue, newConfiguration) {
        if (newConfiguration !== undefined) {
          configure(newConfiguration);
        }
        var ratio = scale(newValue);
        var newAngle = config.minAngle + ratio * range;
        pointer
          .transition()
          .duration(config.transitionMs)
          .ease('ease')
          .attr('transform', 'rotate(' + newAngle + ')');
      }
      that.update = update;

      configure(configuration);

      function powerGaugeStatus(status) {
        if (status === 'high') {
          this.update(2.5);
        } else if (status === 'med') {
          this.update(1.5);
        } else if (status === 'low') {
          this.update(0.5);
        }
      }
      that.powerGaugeStatus = powerGaugeStatus;

      function setFlow(flow) {
        if (flow === currentFlow) {
          return;
        }

        currentFlow = flow;

        if (flow < 3) {
          this.powerGaugeStatus('low');
        } else if (flow > 3 && flow < 5) {
          this.powerGaugeStatus('med');
        } else if (flow > 5) {
          this.powerGaugeStatus('high');
        }
      }
      that.setFlow = setFlow;

      return that;
    }
  },
};
</script>

<style scoped>
#Flow {
  text-align: center;
  color: white;
  font-size: 2.4rem;
  font-weight: 700;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin: 0 auto;
}

.graphs-title {
  flex: 2;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#gauge {
  width: 100%;
  flex: 3;
  height: 0%;
}

#gauge > svg {
  height: 100%;
  width: 100%;
}

.graphs-status {
  flex: 2;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
