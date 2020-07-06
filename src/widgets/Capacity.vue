<template>
  <div id="Capacity" class="mid">
    <div v-if="mode !== 'preview'" class="graphs-title">
      <span id="text-capacity_title">{{ capacity_title }}</span>
    </div>
    <div class="graphs-graph">
      <svg :id="gaugeId"></svg>
    </div>

    <div v-if="mode !== 'preview'" class="graphs-status">
      <span class="digits">{{ roundedCapacity }}</span
      ><span class="whitespace"> </span> <span class="total">%</span
      ><span class="whitespace"> </span>
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
      capacity_title: en.capacity_title,
      capacity: 75.1,
    };
  },
  computed: {
    roundedCapacity() {
      return this.capacity.toFixed();
    },
  },
  beforeCreate() {
    this.gaugeId = `E${this._uid}`;
  },
  mounted() {
    loadLiquidFillGauge(this.gaugeId, this.capacity);

    function liquidFillGaugeDefaultSettings() {
      return {
        minValue: 0, // The gauge minimum value.
        maxValue: 100, // The gauge maximum value.
        circleThickness: 0.05, // The outer circle thickness as a percentage of it's radius.
        circleFillGap: 0.05, // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
        circleColor: '#ffcd1b', // The color of the outer circle.
        waveHeight: 0.05, // The wave height as a percentage of the radius of the wave circle.
        waveCount: 3, // The number of full waves per width of the wave circle.
        waveRiseTime: 1000, // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
        waveAnimateTime: 1000, // The amount of time in milliseconds for a full wave to enter the wave circle.
        waveRise: true, // Control if the wave should rise from 0 to it's full height, or start at it's full height.
        waveHeightScaling: true, // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near it's minimum or maximum fill.
        waveAnimate: true, // Controls if the wave scrolls or is static.
        waveColor: '#ffcd1b', // The color of the fill wave.
        waveOffset: 0.25, // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
        textVertPosition: 0.8, // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
      };
    }

    function loadLiquidFillGauge(elementId, value, config) {
      if (config == null) config = liquidFillGaugeDefaultSettings();
      // Using d3 from index.html
      var gauge = d3.select('#' + elementId);
      var radius =
        Math.min(
          parseInt(gauge.style('width')),
          parseInt(gauge.style('height'))
        ) / 2;
      var locationX = parseInt(gauge.style('width')) / 2 - radius;
      var locationY = parseInt(gauge.style('height')) / 2 - radius;
      var fillPercent =
        Math.max(config.minValue, Math.min(config.maxValue, value)) /
        config.maxValue;

      var waveHeightScale;
      if (config.waveHeightScaling) {
        waveHeightScale = d3.scale
          .linear()
          .range([0, config.waveHeight, 0])
          .domain([0, 50, 100]);
      } else {
        waveHeightScale = d3.scale
          .linear()
          .range([config.waveHeight, config.waveHeight])
          .domain([0, 100]);
      }

      var circleThickness = config.circleThickness * radius;
      var circleFillGap = config.circleFillGap * radius;
      var fillCircleMargin = circleThickness + circleFillGap;
      var fillCircleRadius = radius - fillCircleMargin;
      var waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);

      var waveLength = (fillCircleRadius * 2) / config.waveCount;
      var waveClipCount = 1 + config.waveCount;
      var waveClipWidth = waveLength * waveClipCount;

      // Data for building the clip wave area.
      var data = [];
      for (var i = 0; i <= 40 * waveClipCount; i++) {
        data.push({
          x: i / (40 * waveClipCount),
          y: i / 40,
        });
      }

      // Scales for drawing the outer circle.
      var gaugeCircleX = d3.scale
        .linear()
        .range([0, 2 * Math.PI])
        .domain([0, 1]);
      var gaugeCircleY = d3.scale
        .linear()
        .range([0, radius])
        .domain([0, radius]);

      // Scales for controlling the size of the clipping path.
      var waveScaleX = d3.scale
        .linear()
        .range([0, waveClipWidth])
        .domain([0, 1]);
      var waveScaleY = d3.scale
        .linear()
        .range([0, waveHeight])
        .domain([0, 1]);

      // Scales for controlling the position of the clipping path.
      var waveRiseScale = d3.scale
        .linear()
        // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
        // such that the it will won't overlap the fill circle at all when at 0%, and will totally cover the fill
        // circle at 100%.
        .range([
          fillCircleMargin + fillCircleRadius * 2 + waveHeight,
          fillCircleMargin - waveHeight,
        ])
        .domain([0, 1]);
      var waveAnimateScale = d3.scale
        .linear()
        .range([0, waveClipWidth - fillCircleRadius * 2]) // Push the clip area one full wave then snap back.
        .domain([0, 1]);

      // Center the gauge within the parent SVG.
      var gaugeGroup = gauge
        .append('g')
        .attr('transform', 'translate(' + locationX + ',' + locationY + ')');

      // Draw the outer circle.
      var gaugeCircleArc = d3.svg
        .arc()
        .startAngle(gaugeCircleX(0))
        .endAngle(gaugeCircleX(1))
        .outerRadius(gaugeCircleY(radius))
        .innerRadius(gaugeCircleY(radius - circleThickness));
      gaugeGroup
        .append('path')
        .attr('d', gaugeCircleArc)
        .style('fill', config.circleColor)
        .attr('transform', 'translate(' + radius + ',' + radius + ')');

      // The clipping wave area.
      var clipArea = d3.svg
        .area()
        .x(function(d) {
          return waveScaleX(d.x);
        })
        .y0(function(d) {
          return waveScaleY(
            Math.sin(
              Math.PI * 2 * config.waveOffset * -1 +
                Math.PI * 2 * (1 - config.waveCount) +
                d.y * 2 * Math.PI
            )
          );
        })
        .y1(function(d) {
          return fillCircleRadius * 2 + waveHeight;
        });
      var waveGroup = gaugeGroup
        .append('defs')
        .append('clipPath')
        .attr('id', 'clipWave' + elementId);
      var wave = waveGroup
        .append('path')
        .datum(data)
        .attr('d', clipArea);

      // The inner circle with the clipping wave attached.
      var fillCircleGroup = gaugeGroup
        .append('g')
        .attr('clip-path', 'url(#clipWave' + elementId + ')');
      fillCircleGroup
        .append('circle')
        .attr('cx', radius)
        .attr('cy', radius)
        .attr('r', fillCircleRadius)
        .style('fill', config.waveColor);

      // Make the wave rise. wave and waveGroup are separate so that horizontal and vertical movement can be controlled independently.
      var waveGroupXPosition =
        fillCircleMargin + fillCircleRadius * 2 - waveClipWidth;
      if (config.waveRise) {
        waveGroup
          .attr(
            'transform',
            'translate(' + waveGroupXPosition + ',' + waveRiseScale(0) + ')'
          )
          .transition()
          .duration(config.waveRiseTime)
          .attr(
            'transform',
            'translate(' +
              waveGroupXPosition +
              ',' +
              waveRiseScale(fillPercent) +
              ')'
          )
          .each('start', function() {
            wave.attr('transform', 'translate(1,0)');
          }); // This transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false. The wave will not position correctly without this, but it's not clear why this is actually necessary.
      } else {
        waveGroup.attr(
          'transform',
          'translate(' +
            waveGroupXPosition +
            ',' +
            waveRiseScale(fillPercent) +
            ')'
        );
      }

      if (config.waveAnimate) animateWave();

      function animateWave() {
        wave
          .transition()
          .duration(config.waveAnimateTime)
          .ease('linear')
          .attr('transform', 'translate(' + waveAnimateScale(1) + ',0)')
          .each('end', function() {
            wave.attr('transform', 'translate(' + waveAnimateScale(0) + ',0)');
            animateWave(config.waveAnimateTime);
          });
      }
    }
  },
};
</script>

<style scoped>
#Capacity {
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

.graphs-graph {
  flex: 3;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.graphs-graph > svg {
  width: 100%;
  height: 100%;
}

.graphs-status {
  flex: 2;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
