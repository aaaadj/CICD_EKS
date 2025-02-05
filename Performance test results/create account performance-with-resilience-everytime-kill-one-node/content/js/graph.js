/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 91.0, "minX": 0.0, "maxY": 21367.0, "series": [{"data": [[0.0, 91.0], [0.1, 98.0], [0.2, 99.0], [0.3, 100.0], [0.4, 100.0], [0.5, 101.0], [0.6, 101.0], [0.7, 101.0], [0.8, 102.0], [0.9, 102.0], [1.0, 102.0], [1.1, 102.0], [1.2, 103.0], [1.3, 103.0], [1.4, 103.0], [1.5, 103.0], [1.6, 103.0], [1.7, 104.0], [1.8, 104.0], [1.9, 104.0], [2.0, 104.0], [2.1, 104.0], [2.2, 104.0], [2.3, 104.0], [2.4, 105.0], [2.5, 105.0], [2.6, 105.0], [2.7, 105.0], [2.8, 105.0], [2.9, 105.0], [3.0, 105.0], [3.1, 105.0], [3.2, 105.0], [3.3, 106.0], [3.4, 106.0], [3.5, 106.0], [3.6, 106.0], [3.7, 106.0], [3.8, 106.0], [3.9, 106.0], [4.0, 106.0], [4.1, 106.0], [4.2, 106.0], [4.3, 106.0], [4.4, 107.0], [4.5, 107.0], [4.6, 107.0], [4.7, 107.0], [4.8, 107.0], [4.9, 107.0], [5.0, 107.0], [5.1, 107.0], [5.2, 107.0], [5.3, 107.0], [5.4, 107.0], [5.5, 108.0], [5.6, 108.0], [5.7, 108.0], [5.8, 108.0], [5.9, 108.0], [6.0, 108.0], [6.1, 108.0], [6.2, 108.0], [6.3, 108.0], [6.4, 108.0], [6.5, 108.0], [6.6, 108.0], [6.7, 108.0], [6.8, 109.0], [6.9, 109.0], [7.0, 109.0], [7.1, 109.0], [7.2, 109.0], [7.3, 109.0], [7.4, 109.0], [7.5, 109.0], [7.6, 109.0], [7.7, 109.0], [7.8, 109.0], [7.9, 109.0], [8.0, 109.0], [8.1, 109.0], [8.2, 110.0], [8.3, 110.0], [8.4, 110.0], [8.5, 110.0], [8.6, 110.0], [8.7, 110.0], [8.8, 110.0], [8.9, 110.0], [9.0, 110.0], [9.1, 110.0], [9.2, 110.0], [9.3, 110.0], [9.4, 110.0], [9.5, 110.0], [9.6, 111.0], [9.7, 111.0], [9.8, 111.0], [9.9, 111.0], [10.0, 111.0], [10.1, 111.0], [10.2, 111.0], [10.3, 111.0], [10.4, 111.0], [10.5, 111.0], [10.6, 111.0], [10.7, 111.0], [10.8, 111.0], [10.9, 111.0], [11.0, 111.0], [11.1, 111.0], [11.2, 112.0], [11.3, 112.0], [11.4, 112.0], [11.5, 112.0], [11.6, 112.0], [11.7, 112.0], [11.8, 112.0], [11.9, 112.0], [12.0, 112.0], [12.1, 112.0], [12.2, 112.0], [12.3, 112.0], [12.4, 112.0], [12.5, 112.0], [12.6, 112.0], [12.7, 112.0], [12.8, 113.0], [12.9, 113.0], [13.0, 113.0], [13.1, 113.0], [13.2, 113.0], [13.3, 113.0], [13.4, 113.0], [13.5, 113.0], [13.6, 113.0], [13.7, 113.0], [13.8, 113.0], [13.9, 113.0], [14.0, 113.0], [14.1, 113.0], [14.2, 113.0], [14.3, 113.0], [14.4, 114.0], [14.5, 114.0], [14.6, 114.0], [14.7, 114.0], [14.8, 114.0], [14.9, 114.0], [15.0, 114.0], [15.1, 114.0], [15.2, 114.0], [15.3, 114.0], [15.4, 114.0], [15.5, 114.0], [15.6, 114.0], [15.7, 114.0], [15.8, 114.0], [15.9, 114.0], [16.0, 114.0], [16.1, 115.0], [16.2, 115.0], [16.3, 115.0], [16.4, 115.0], [16.5, 115.0], [16.6, 115.0], [16.7, 115.0], [16.8, 115.0], [16.9, 115.0], [17.0, 115.0], [17.1, 115.0], [17.2, 115.0], [17.3, 115.0], [17.4, 115.0], [17.5, 115.0], [17.6, 115.0], [17.7, 116.0], [17.8, 116.0], [17.9, 116.0], [18.0, 116.0], [18.1, 116.0], [18.2, 116.0], [18.3, 116.0], [18.4, 116.0], [18.5, 116.0], [18.6, 116.0], [18.7, 116.0], [18.8, 116.0], [18.9, 116.0], [19.0, 116.0], [19.1, 116.0], [19.2, 116.0], [19.3, 116.0], [19.4, 117.0], [19.5, 117.0], [19.6, 117.0], [19.7, 117.0], [19.8, 117.0], [19.9, 117.0], [20.0, 117.0], [20.1, 117.0], [20.2, 117.0], [20.3, 117.0], [20.4, 117.0], [20.5, 117.0], [20.6, 117.0], [20.7, 117.0], [20.8, 117.0], [20.9, 117.0], [21.0, 118.0], [21.1, 118.0], [21.2, 118.0], [21.3, 118.0], [21.4, 118.0], [21.5, 118.0], [21.6, 118.0], [21.7, 118.0], [21.8, 118.0], [21.9, 118.0], [22.0, 118.0], [22.1, 118.0], [22.2, 118.0], [22.3, 118.0], [22.4, 118.0], [22.5, 118.0], [22.6, 119.0], [22.7, 119.0], [22.8, 119.0], [22.9, 119.0], [23.0, 119.0], [23.1, 119.0], [23.2, 119.0], [23.3, 119.0], [23.4, 119.0], [23.5, 119.0], [23.6, 119.0], [23.7, 119.0], [23.8, 119.0], [23.9, 119.0], [24.0, 119.0], [24.1, 119.0], [24.2, 120.0], [24.3, 120.0], [24.4, 120.0], [24.5, 120.0], [24.6, 120.0], [24.7, 120.0], [24.8, 120.0], [24.9, 120.0], [25.0, 120.0], [25.1, 120.0], [25.2, 120.0], [25.3, 120.0], [25.4, 120.0], [25.5, 120.0], [25.6, 120.0], [25.7, 121.0], [25.8, 121.0], [25.9, 121.0], [26.0, 121.0], [26.1, 121.0], [26.2, 121.0], [26.3, 121.0], [26.4, 121.0], [26.5, 121.0], [26.6, 121.0], [26.7, 121.0], [26.8, 121.0], [26.9, 121.0], [27.0, 121.0], [27.1, 121.0], [27.2, 122.0], [27.3, 122.0], [27.4, 122.0], [27.5, 122.0], [27.6, 122.0], [27.7, 122.0], [27.8, 122.0], [27.9, 122.0], [28.0, 122.0], [28.1, 122.0], [28.2, 122.0], [28.3, 122.0], [28.4, 122.0], [28.5, 122.0], [28.6, 122.0], [28.7, 123.0], [28.8, 123.0], [28.9, 123.0], [29.0, 123.0], [29.1, 123.0], [29.2, 123.0], [29.3, 123.0], [29.4, 123.0], [29.5, 123.0], [29.6, 123.0], [29.7, 123.0], [29.8, 123.0], [29.9, 123.0], [30.0, 123.0], [30.1, 124.0], [30.2, 124.0], [30.3, 124.0], [30.4, 124.0], [30.5, 124.0], [30.6, 124.0], [30.7, 124.0], [30.8, 124.0], [30.9, 124.0], [31.0, 124.0], [31.1, 124.0], [31.2, 124.0], [31.3, 124.0], [31.4, 124.0], [31.5, 125.0], [31.6, 125.0], [31.7, 125.0], [31.8, 125.0], [31.9, 125.0], [32.0, 125.0], [32.1, 125.0], [32.2, 125.0], [32.3, 125.0], [32.4, 125.0], [32.5, 125.0], [32.6, 125.0], [32.7, 125.0], [32.8, 125.0], [32.9, 126.0], [33.0, 126.0], [33.1, 126.0], [33.2, 126.0], [33.3, 126.0], [33.4, 126.0], [33.5, 126.0], [33.6, 126.0], [33.7, 126.0], [33.8, 126.0], [33.9, 126.0], [34.0, 126.0], [34.1, 126.0], [34.2, 127.0], [34.3, 127.0], [34.4, 127.0], [34.5, 127.0], [34.6, 127.0], [34.7, 127.0], [34.8, 127.0], [34.9, 127.0], [35.0, 127.0], [35.1, 127.0], [35.2, 127.0], [35.3, 127.0], [35.4, 127.0], [35.5, 128.0], [35.6, 128.0], [35.7, 128.0], [35.8, 128.0], [35.9, 128.0], [36.0, 128.0], [36.1, 128.0], [36.2, 128.0], [36.3, 128.0], [36.4, 128.0], [36.5, 128.0], [36.6, 128.0], [36.7, 129.0], [36.8, 129.0], [36.9, 129.0], [37.0, 129.0], [37.1, 129.0], [37.2, 129.0], [37.3, 129.0], [37.4, 129.0], [37.5, 129.0], [37.6, 129.0], [37.7, 129.0], [37.8, 129.0], [37.9, 130.0], [38.0, 130.0], [38.1, 130.0], [38.2, 130.0], [38.3, 130.0], [38.4, 130.0], [38.5, 130.0], [38.6, 130.0], [38.7, 130.0], [38.8, 130.0], [38.9, 130.0], [39.0, 131.0], [39.1, 131.0], [39.2, 131.0], [39.3, 131.0], [39.4, 131.0], [39.5, 131.0], [39.6, 131.0], [39.7, 131.0], [39.8, 131.0], [39.9, 131.0], [40.0, 131.0], [40.1, 132.0], [40.2, 132.0], [40.3, 132.0], [40.4, 132.0], [40.5, 132.0], [40.6, 132.0], [40.7, 132.0], [40.8, 132.0], [40.9, 132.0], [41.0, 132.0], [41.1, 132.0], [41.2, 133.0], [41.3, 133.0], [41.4, 133.0], [41.5, 133.0], [41.6, 133.0], [41.7, 133.0], [41.8, 133.0], [41.9, 133.0], [42.0, 133.0], [42.1, 133.0], [42.2, 133.0], [42.3, 134.0], [42.4, 134.0], [42.5, 134.0], [42.6, 134.0], [42.7, 134.0], [42.8, 134.0], [42.9, 134.0], [43.0, 134.0], [43.1, 134.0], [43.2, 134.0], [43.3, 135.0], [43.4, 135.0], [43.5, 135.0], [43.6, 135.0], [43.7, 135.0], [43.8, 135.0], [43.9, 135.0], [44.0, 135.0], [44.1, 135.0], [44.2, 136.0], [44.3, 136.0], [44.4, 136.0], [44.5, 136.0], [44.6, 136.0], [44.7, 136.0], [44.8, 136.0], [44.9, 136.0], [45.0, 136.0], [45.1, 137.0], [45.2, 137.0], [45.3, 137.0], [45.4, 137.0], [45.5, 137.0], [45.6, 137.0], [45.7, 137.0], [45.8, 137.0], [45.9, 137.0], [46.0, 138.0], [46.1, 138.0], [46.2, 138.0], [46.3, 138.0], [46.4, 138.0], [46.5, 138.0], [46.6, 138.0], [46.7, 138.0], [46.8, 138.0], [46.9, 139.0], [47.0, 139.0], [47.1, 139.0], [47.2, 139.0], [47.3, 139.0], [47.4, 139.0], [47.5, 139.0], [47.6, 139.0], [47.7, 140.0], [47.8, 140.0], [47.9, 140.0], [48.0, 140.0], [48.1, 140.0], [48.2, 140.0], [48.3, 140.0], [48.4, 140.0], [48.5, 141.0], [48.6, 141.0], [48.7, 141.0], [48.8, 141.0], [48.9, 141.0], [49.0, 141.0], [49.1, 141.0], [49.2, 141.0], [49.3, 142.0], [49.4, 142.0], [49.5, 142.0], [49.6, 142.0], [49.7, 142.0], [49.8, 142.0], [49.9, 142.0], [50.0, 143.0], [50.1, 143.0], [50.2, 143.0], [50.3, 143.0], [50.4, 143.0], [50.5, 143.0], [50.6, 143.0], [50.7, 143.0], [50.8, 144.0], [50.9, 144.0], [51.0, 144.0], [51.1, 144.0], [51.2, 144.0], [51.3, 144.0], [51.4, 145.0], [51.5, 145.0], [51.6, 145.0], [51.7, 145.0], [51.8, 145.0], [51.9, 145.0], [52.0, 145.0], [52.1, 146.0], [52.2, 146.0], [52.3, 146.0], [52.4, 146.0], [52.5, 146.0], [52.6, 146.0], [52.7, 146.0], [52.8, 147.0], [52.9, 147.0], [53.0, 147.0], [53.1, 147.0], [53.2, 147.0], [53.3, 147.0], [53.4, 148.0], [53.5, 148.0], [53.6, 148.0], [53.7, 148.0], [53.8, 148.0], [53.9, 148.0], [54.0, 149.0], [54.1, 149.0], [54.2, 149.0], [54.3, 149.0], [54.4, 149.0], [54.5, 149.0], [54.6, 150.0], [54.7, 150.0], [54.8, 150.0], [54.9, 150.0], [55.0, 150.0], [55.1, 151.0], [55.2, 151.0], [55.3, 151.0], [55.4, 151.0], [55.5, 151.0], [55.6, 151.0], [55.7, 152.0], [55.8, 152.0], [55.9, 152.0], [56.0, 152.0], [56.1, 152.0], [56.2, 153.0], [56.3, 153.0], [56.4, 153.0], [56.5, 153.0], [56.6, 153.0], [56.7, 153.0], [56.8, 154.0], [56.9, 154.0], [57.0, 154.0], [57.1, 154.0], [57.2, 154.0], [57.3, 155.0], [57.4, 155.0], [57.5, 155.0], [57.6, 155.0], [57.7, 155.0], [57.8, 156.0], [57.9, 156.0], [58.0, 156.0], [58.1, 156.0], [58.2, 157.0], [58.3, 157.0], [58.4, 157.0], [58.5, 157.0], [58.6, 157.0], [58.7, 158.0], [58.8, 158.0], [58.9, 158.0], [59.0, 158.0], [59.1, 159.0], [59.2, 159.0], [59.3, 159.0], [59.4, 159.0], [59.5, 159.0], [59.6, 160.0], [59.7, 160.0], [59.8, 160.0], [59.9, 160.0], [60.0, 161.0], [60.1, 161.0], [60.2, 161.0], [60.3, 161.0], [60.4, 162.0], [60.5, 162.0], [60.6, 162.0], [60.7, 162.0], [60.8, 163.0], [60.9, 163.0], [61.0, 163.0], [61.1, 163.0], [61.2, 164.0], [61.3, 164.0], [61.4, 164.0], [61.5, 164.0], [61.6, 165.0], [61.7, 165.0], [61.8, 165.0], [61.9, 165.0], [62.0, 166.0], [62.1, 166.0], [62.2, 166.0], [62.3, 167.0], [62.4, 167.0], [62.5, 167.0], [62.6, 167.0], [62.7, 168.0], [62.8, 168.0], [62.9, 168.0], [63.0, 168.0], [63.1, 169.0], [63.2, 169.0], [63.3, 169.0], [63.4, 170.0], [63.5, 170.0], [63.6, 170.0], [63.7, 171.0], [63.8, 171.0], [63.9, 171.0], [64.0, 171.0], [64.1, 172.0], [64.2, 172.0], [64.3, 172.0], [64.4, 173.0], [64.5, 173.0], [64.6, 173.0], [64.7, 174.0], [64.8, 174.0], [64.9, 174.0], [65.0, 175.0], [65.1, 175.0], [65.2, 175.0], [65.3, 176.0], [65.4, 176.0], [65.5, 176.0], [65.6, 177.0], [65.7, 177.0], [65.8, 177.0], [65.9, 178.0], [66.0, 178.0], [66.1, 178.0], [66.2, 179.0], [66.3, 179.0], [66.4, 179.0], [66.5, 180.0], [66.6, 180.0], [66.7, 180.0], [66.8, 181.0], [66.9, 181.0], [67.0, 181.0], [67.1, 182.0], [67.2, 182.0], [67.3, 183.0], [67.4, 183.0], [67.5, 183.0], [67.6, 184.0], [67.7, 184.0], [67.8, 185.0], [67.9, 185.0], [68.0, 185.0], [68.1, 186.0], [68.2, 186.0], [68.3, 187.0], [68.4, 187.0], [68.5, 188.0], [68.6, 188.0], [68.7, 188.0], [68.8, 189.0], [68.9, 189.0], [69.0, 190.0], [69.1, 190.0], [69.2, 190.0], [69.3, 191.0], [69.4, 191.0], [69.5, 192.0], [69.6, 192.0], [69.7, 193.0], [69.8, 193.0], [69.9, 194.0], [70.0, 194.0], [70.1, 194.0], [70.2, 195.0], [70.3, 195.0], [70.4, 196.0], [70.5, 196.0], [70.6, 197.0], [70.7, 197.0], [70.8, 198.0], [70.9, 198.0], [71.0, 199.0], [71.1, 199.0], [71.2, 199.0], [71.3, 200.0], [71.4, 200.0], [71.5, 201.0], [71.6, 201.0], [71.7, 202.0], [71.8, 202.0], [71.9, 203.0], [72.0, 203.0], [72.1, 204.0], [72.2, 204.0], [72.3, 205.0], [72.4, 205.0], [72.5, 206.0], [72.6, 206.0], [72.7, 207.0], [72.8, 207.0], [72.9, 208.0], [73.0, 208.0], [73.1, 209.0], [73.2, 209.0], [73.3, 210.0], [73.4, 210.0], [73.5, 211.0], [73.6, 211.0], [73.7, 212.0], [73.8, 212.0], [73.9, 213.0], [74.0, 213.0], [74.1, 214.0], [74.2, 214.0], [74.3, 215.0], [74.4, 216.0], [74.5, 216.0], [74.6, 217.0], [74.7, 217.0], [74.8, 218.0], [74.9, 218.0], [75.0, 219.0], [75.1, 219.0], [75.2, 220.0], [75.3, 220.0], [75.4, 221.0], [75.5, 222.0], [75.6, 222.0], [75.7, 223.0], [75.8, 223.0], [75.9, 224.0], [76.0, 224.0], [76.1, 225.0], [76.2, 225.0], [76.3, 226.0], [76.4, 226.0], [76.5, 227.0], [76.6, 227.0], [76.7, 228.0], [76.8, 229.0], [76.9, 229.0], [77.0, 230.0], [77.1, 230.0], [77.2, 231.0], [77.3, 231.0], [77.4, 232.0], [77.5, 233.0], [77.6, 233.0], [77.7, 234.0], [77.8, 234.0], [77.9, 235.0], [78.0, 235.0], [78.1, 236.0], [78.2, 237.0], [78.3, 237.0], [78.4, 238.0], [78.5, 238.0], [78.6, 239.0], [78.7, 239.0], [78.8, 240.0], [78.9, 241.0], [79.0, 241.0], [79.1, 242.0], [79.2, 242.0], [79.3, 243.0], [79.4, 243.0], [79.5, 244.0], [79.6, 245.0], [79.7, 245.0], [79.8, 246.0], [79.9, 246.0], [80.0, 247.0], [80.1, 248.0], [80.2, 248.0], [80.3, 249.0], [80.4, 249.0], [80.5, 250.0], [80.6, 251.0], [80.7, 251.0], [80.8, 252.0], [80.9, 252.0], [81.0, 253.0], [81.1, 254.0], [81.2, 254.0], [81.3, 255.0], [81.4, 255.0], [81.5, 256.0], [81.6, 257.0], [81.7, 257.0], [81.8, 258.0], [81.9, 259.0], [82.0, 259.0], [82.1, 260.0], [82.2, 260.0], [82.3, 261.0], [82.4, 262.0], [82.5, 262.0], [82.6, 263.0], [82.7, 263.0], [82.8, 264.0], [82.9, 265.0], [83.0, 265.0], [83.1, 266.0], [83.2, 266.0], [83.3, 267.0], [83.4, 268.0], [83.5, 268.0], [83.6, 269.0], [83.7, 270.0], [83.8, 270.0], [83.9, 271.0], [84.0, 272.0], [84.1, 272.0], [84.2, 273.0], [84.3, 273.0], [84.4, 274.0], [84.5, 275.0], [84.6, 275.0], [84.7, 276.0], [84.8, 277.0], [84.9, 277.0], [85.0, 278.0], [85.1, 279.0], [85.2, 279.0], [85.3, 280.0], [85.4, 281.0], [85.5, 281.0], [85.6, 282.0], [85.7, 282.0], [85.8, 283.0], [85.9, 284.0], [86.0, 284.0], [86.1, 285.0], [86.2, 286.0], [86.3, 286.0], [86.4, 287.0], [86.5, 288.0], [86.6, 288.0], [86.7, 289.0], [86.8, 290.0], [86.9, 290.0], [87.0, 291.0], [87.1, 292.0], [87.2, 293.0], [87.3, 293.0], [87.4, 294.0], [87.5, 295.0], [87.6, 295.0], [87.7, 296.0], [87.8, 297.0], [87.9, 297.0], [88.0, 298.0], [88.1, 299.0], [88.2, 300.0], [88.3, 300.0], [88.4, 301.0], [88.5, 302.0], [88.6, 303.0], [88.7, 303.0], [88.8, 304.0], [88.9, 305.0], [89.0, 306.0], [89.1, 306.0], [89.2, 307.0], [89.3, 308.0], [89.4, 309.0], [89.5, 309.0], [89.6, 310.0], [89.7, 311.0], [89.8, 312.0], [89.9, 313.0], [90.0, 313.0], [90.1, 314.0], [90.2, 315.0], [90.3, 316.0], [90.4, 317.0], [90.5, 318.0], [90.6, 319.0], [90.7, 320.0], [90.8, 321.0], [90.9, 322.0], [91.0, 323.0], [91.1, 324.0], [91.2, 325.0], [91.3, 326.0], [91.4, 327.0], [91.5, 328.0], [91.6, 329.0], [91.7, 330.0], [91.8, 331.0], [91.9, 332.0], [92.0, 333.0], [92.1, 334.0], [92.2, 335.0], [92.3, 336.0], [92.4, 337.0], [92.5, 338.0], [92.6, 339.0], [92.7, 341.0], [92.8, 342.0], [92.9, 343.0], [93.0, 344.0], [93.1, 346.0], [93.2, 347.0], [93.3, 348.0], [93.4, 349.0], [93.5, 351.0], [93.6, 352.0], [93.7, 354.0], [93.8, 355.0], [93.9, 357.0], [94.0, 358.0], [94.1, 360.0], [94.2, 361.0], [94.3, 363.0], [94.4, 365.0], [94.5, 367.0], [94.6, 368.0], [94.7, 370.0], [94.8, 372.0], [94.9, 374.0], [95.0, 377.0], [95.1, 379.0], [95.2, 381.0], [95.3, 384.0], [95.4, 386.0], [95.5, 389.0], [95.6, 391.0], [95.7, 394.0], [95.8, 397.0], [95.9, 400.0], [96.0, 403.0], [96.1, 406.0], [96.2, 409.0], [96.3, 413.0], [96.4, 416.0], [96.5, 420.0], [96.6, 423.0], [96.7, 427.0], [96.8, 431.0], [96.9, 435.0], [97.0, 439.0], [97.1, 443.0], [97.2, 448.0], [97.3, 453.0], [97.4, 458.0], [97.5, 463.0], [97.6, 469.0], [97.7, 474.0], [97.8, 480.0], [97.9, 485.0], [98.0, 491.0], [98.1, 497.0], [98.2, 503.0], [98.3, 510.0], [98.4, 517.0], [98.5, 525.0], [98.6, 532.0], [98.7, 540.0], [98.8, 549.0], [98.9, 558.0], [99.0, 570.0], [99.1, 583.0], [99.2, 596.0], [99.3, 614.0], [99.4, 635.0], [99.5, 664.0], [99.6, 705.0], [99.7, 761.0], [99.8, 838.0], [99.9, 950.0], [100.0, 21367.0]], "isOverall": false, "label": "Account create", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 709583.0, "series": [{"data": [[0.0, 2565.0], [600.0, 3659.0], [700.0, 1667.0], [800.0, 1069.0], [900.0, 682.0], [15300.0, 19.0], [15200.0, 43.0], [15400.0, 14.0], [15500.0, 2.0], [1000.0, 266.0], [16000.0, 1.0], [1100.0, 158.0], [1200.0, 98.0], [1300.0, 53.0], [21300.0, 1.0], [1400.0, 23.0], [1500.0, 17.0], [100.0, 709583.0], [1600.0, 12.0], [1700.0, 3.0], [1800.0, 3.0], [2000.0, 1.0], [200.0, 169844.0], [300.0, 76830.0], [400.0, 22544.0], [500.0, 10843.0]], "isOverall": false, "label": "Account create", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 21300.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 981527.0, "series": [{"data": [[0.0, 981527.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 18356.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 116.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 1.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 198.04781829049608, "minX": 1.73869446E12, "maxY": 200.0, "series": [{"data": [[1.738695E12, 200.0], [1.7386947E12, 200.0], [1.73869464E12, 200.0], [1.7386953E12, 200.0], [1.73869524E12, 200.0], [1.73869494E12, 200.0], [1.73869488E12, 200.0], [1.73869458E12, 200.0], [1.73869452E12, 200.0], [1.73869518E12, 200.0], [1.73869512E12, 200.0], [1.73869482E12, 200.0], [1.73869476E12, 200.0], [1.73869542E12, 198.04781829049608], [1.73869446E12, 198.84048497627862], [1.73869536E12, 200.0], [1.73869506E12, 200.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73869542E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 101.0, "minX": 1.0, "maxY": 15230.0, "series": [{"data": [[3.0, 274.0], [4.0, 487.0], [5.0, 280.0], [6.0, 281.0], [8.0, 384.0], [9.0, 270.0], [10.0, 294.0], [15.0, 374.2], [17.0, 293.0], [18.0, 289.0], [19.0, 515.0], [20.0, 308.0], [22.0, 401.0], [25.0, 303.6666666666667], [26.0, 300.0], [29.0, 304.6666666666667], [30.0, 304.0], [31.0, 306.0], [33.0, 310.0], [32.0, 310.0], [37.0, 311.0], [36.0, 310.3333333333333], [39.0, 323.0], [38.0, 306.0], [41.0, 317.0], [40.0, 318.0], [43.0, 311.0], [42.0, 314.0], [45.0, 316.0], [44.0, 322.0], [47.0, 315.0], [46.0, 315.0], [48.0, 475.0], [50.0, 326.0], [53.0, 278.0], [52.0, 331.5], [54.0, 212.0], [55.0, 291.6666666666667], [56.0, 250.8], [57.0, 330.0], [58.0, 255.33333333333334], [59.0, 357.0], [60.0, 241.75], [61.0, 243.33333333333334], [62.0, 273.0], [63.0, 304.0], [64.0, 303.0], [65.0, 289.2], [67.0, 265.2], [68.0, 197.0], [70.0, 209.0], [71.0, 195.0], [69.0, 372.0], [72.0, 251.0], [73.0, 275.125], [74.0, 206.0], [80.0, 125.0], [81.0, 160.0], [82.0, 232.0], [83.0, 166.25], [84.0, 207.0], [88.0, 314.0], [89.0, 240.0], [90.0, 135.5], [91.0, 178.83333333333334], [92.0, 190.50000000000003], [95.0, 182.25000000000003], [96.0, 190.33333333333334], [97.0, 214.33333333333334], [98.0, 180.2], [99.0, 215.0], [100.0, 201.14285714285714], [102.0, 192.0], [103.0, 140.0], [101.0, 128.0], [104.0, 155.0], [105.0, 158.0], [107.0, 131.66666666666666], [108.0, 217.0], [109.0, 228.25], [110.0, 225.6], [111.0, 123.0], [112.0, 165.14285714285714], [113.0, 247.5], [114.0, 140.09090909090907], [115.0, 201.33333333333331], [116.0, 179.75], [117.0, 201.5], [118.0, 164.33333333333334], [119.0, 193.6], [120.0, 171.0], [121.0, 184.0], [122.0, 112.5], [123.0, 187.14285714285714], [124.0, 154.5], [125.0, 159.5], [126.0, 229.0], [127.0, 254.0], [128.0, 149.33333333333334], [129.0, 199.875], [130.0, 275.0], [131.0, 177.75], [133.0, 174.33333333333334], [135.0, 169.5], [134.0, 353.0], [132.0, 352.0], [136.0, 204.8], [137.0, 153.75], [138.0, 133.0], [139.0, 259.25], [140.0, 223.0], [141.0, 178.46666666666667], [143.0, 173.0], [142.0, 160.0], [144.0, 267.0], [145.0, 150.8], [146.0, 230.5], [147.0, 169.66666666666666], [148.0, 223.0], [150.0, 221.5], [151.0, 140.0], [149.0, 115.0], [152.0, 204.75], [153.0, 213.5], [155.0, 185.2], [156.0, 204.25], [157.0, 173.12499999999997], [158.0, 176.25], [159.0, 206.33333333333334], [154.0, 155.0], [160.0, 164.0], [161.0, 188.0], [163.0, 257.1428571428571], [164.0, 193.2], [165.0, 234.6], [167.0, 241.12500000000003], [166.0, 231.0], [162.0, 234.5], [169.0, 155.8], [170.0, 204.16666666666666], [171.0, 181.36363636363637], [174.0, 222.57142857142856], [175.0, 130.0], [172.0, 339.0], [168.0, 336.0], [176.0, 190.0], [177.0, 234.49999999999997], [180.0, 224.0], [182.0, 303.0], [183.0, 157.57142857142858], [181.0, 101.0], [179.0, 336.0], [178.0, 136.0], [184.0, 223.0], [185.0, 248.5], [187.0, 306.0], [188.0, 219.59999999999997], [190.0, 235.4545454545455], [186.0, 103.0], [192.0, 299.2], [193.0, 282.5], [195.0, 199.14285714285714], [196.0, 194.0], [198.0, 187.0], [199.0, 194.66666666666666], [197.0, 120.5], [200.0, 186.23126173141975], [1.0, 15230.0]], "isOverall": false, "label": "Account create", "isController": false}, {"data": [[199.95840799999857, 186.26260999999056]], "isOverall": false, "label": "Account create-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 200.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 47477.9, "minX": 1.73869446E12, "maxY": 444731.65, "series": [{"data": [[1.738695E12, 293739.88333333336], [1.7386947E12, 298562.4166666667], [1.73869464E12, 306896.4], [1.7386953E12, 330404.0333333333], [1.73869524E12, 317459.36666666664], [1.73869494E12, 326563.5], [1.73869488E12, 333809.3], [1.73869458E12, 250582.91666666666], [1.73869452E12, 251506.0], [1.73869518E12, 319387.36666666664], [1.73869512E12, 313968.26666666666], [1.73869482E12, 322094.4166666667], [1.73869476E12, 310049.6], [1.73869542E12, 47477.9], [1.73869446E12, 89769.28333333334], [1.73869536E12, 305872.86666666664], [1.73869506E12, 310988.13333333336]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.738695E12, 391358.48333333334], [1.7386947E12, 397774.31666666665], [1.73869464E12, 408883.38333333336], [1.7386953E12, 440198.73333333334], [1.73869524E12, 422956.9166666667], [1.73869494E12, 435082.2], [1.73869488E12, 444731.65], [1.73869458E12, 333845.01666666666], [1.73869452E12, 335099.4666666667], [1.73869518E12, 425518.45], [1.73869512E12, 418304.05], [1.73869482E12, 429135.63333333336], [1.73869476E12, 413074.43333333335], [1.73869542E12, 63249.05], [1.73869446E12, 119522.78333333334], [1.73869536E12, 407515.4166666667], [1.73869506E12, 414332.81666666665]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73869542E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 169.99691148135696, "minX": 1.73869446E12, "maxY": 227.9632577754343, "series": [{"data": [[1.738695E12, 193.20025436280466], [1.7386947E12, 189.95637780558522], [1.73869464E12, 184.69232310157716], [1.7386953E12, 171.70425236521], [1.73869524E12, 178.54765380604672], [1.73869494E12, 173.62088190572726], [1.73869488E12, 169.99691148135696], [1.73869458E12, 226.67896574502154], [1.73869452E12, 225.4099575076133], [1.73869518E12, 177.7885985044777], [1.73869512E12, 180.66643070157068], [1.73869482E12, 176.04566075964217], [1.73869476E12, 183.13241305674205], [1.73869542E12, 199.14395297868012], [1.73869446E12, 227.9632577754343], [1.73869536E12, 185.57101332755988], [1.73869506E12, 182.30374684468305]], "isOverall": false, "label": "Account create", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73869542E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 169.53945653405876, "minX": 1.73869446E12, "maxY": 226.89509752240284, "series": [{"data": [[1.738695E12, 192.7411938952936], [1.7386947E12, 189.54534078849437], [1.73869464E12, 184.17736070019708], [1.7386953E12, 171.26941188257646], [1.73869524E12, 178.14279755697885], [1.73869494E12, 173.09754543479997], [1.73869488E12, 169.53945653405876], [1.73869458E12, 226.24654147400196], [1.73869452E12, 224.43372316022806], [1.73869518E12, 177.37626415932752], [1.73869512E12, 180.26110793143843], [1.73869482E12, 175.58811352057484], [1.73869476E12, 182.5825960951796], [1.73869542E12, 198.67931858936015], [1.73869446E12, 226.89509752240284], [1.73869536E12, 185.14799468134396], [1.73869506E12, 181.8321218941019]], "isOverall": false, "label": "Account create", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73869542E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 1.648078884733071, "minX": 1.73869446E12, "maxY": 3.92558278541542, "series": [{"data": [[1.738695E12, 2.7055992014940147], [1.7386947E12, 2.137693440831248], [1.73869464E12, 2.352548693293908], [1.7386953E12, 2.7153019308113873], [1.73869524E12, 1.65474452554745], [1.73869494E12, 1.9143146767069574], [1.73869488E12, 1.648078884733071], [1.73869458E12, 2.3340568085307205], [1.73869452E12, 1.8424961456022309], [1.73869518E12, 2.1470644850817773], [1.73869512E12, 2.315058589631596], [1.73869482E12, 2.330519299378956], [1.73869476E12, 2.1125533862111077], [1.73869542E12, 3.92558278541542], [1.73869446E12, 2.109435951502365], [1.73869536E12, 2.3439345681684367], [1.73869506E12, 2.121985341078409]], "isOverall": false, "label": "Account create", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73869542E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 91.0, "minX": 1.73869446E12, "maxY": 21367.0, "series": [{"data": [[1.738695E12, 15430.0], [1.7386947E12, 15423.0], [1.73869464E12, 15477.0], [1.7386953E12, 15417.0], [1.73869524E12, 15398.0], [1.73869494E12, 21367.0], [1.73869488E12, 15256.0], [1.73869458E12, 16078.0], [1.73869452E12, 15409.0], [1.73869518E12, 15476.0], [1.73869512E12, 15385.0], [1.73869482E12, 15438.0], [1.73869476E12, 15498.0], [1.73869542E12, 15462.0], [1.73869446E12, 15345.0], [1.73869536E12, 15380.0], [1.73869506E12, 15487.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.738695E12, 344.0], [1.7386947E12, 347.0], [1.73869464E12, 347.0], [1.7386953E12, 222.0], [1.73869524E12, 295.0], [1.73869494E12, 302.0], [1.73869488E12, 237.0], [1.73869458E12, 422.0], [1.73869452E12, 466.0], [1.73869518E12, 280.0], [1.73869512E12, 311.0], [1.73869482E12, 247.0], [1.73869476E12, 330.0], [1.73869542E12, 366.0], [1.73869446E12, 316.0], [1.73869536E12, 371.0], [1.73869506E12, 328.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.738695E12, 569.9900000000016], [1.7386947E12, 581.0], [1.73869464E12, 547.0], [1.7386953E12, 301.0], [1.73869524E12, 464.9900000000016], [1.73869494E12, 462.0], [1.73869488E12, 333.9900000000016], [1.73869458E12, 795.9900000000016], [1.73869452E12, 865.9800000000032], [1.73869518E12, 426.0], [1.73869512E12, 505.9900000000016], [1.73869482E12, 354.0], [1.73869476E12, 610.0], [1.73869542E12, 645.0], [1.73869446E12, 538.0], [1.73869536E12, 660.9900000000016], [1.73869506E12, 508.9900000000016]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.738695E12, 420.0], [1.7386947E12, 398.0], [1.73869464E12, 385.0], [1.7386953E12, 242.0], [1.73869524E12, 334.0], [1.73869494E12, 338.0], [1.73869488E12, 261.0], [1.73869458E12, 520.0], [1.73869452E12, 540.0], [1.73869518E12, 313.0], [1.73869512E12, 349.0], [1.73869482E12, 280.0], [1.73869476E12, 429.9500000000007], [1.73869542E12, 465.0], [1.73869446E12, 374.0], [1.73869536E12, 499.9500000000007], [1.73869506E12, 367.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.738695E12, 95.0], [1.7386947E12, 91.0], [1.73869464E12, 94.0], [1.7386953E12, 94.0], [1.73869524E12, 95.0], [1.73869494E12, 92.0], [1.73869488E12, 94.0], [1.73869458E12, 92.0], [1.73869452E12, 93.0], [1.73869518E12, 95.0], [1.73869512E12, 92.0], [1.73869482E12, 95.0], [1.73869476E12, 95.0], [1.73869542E12, 93.0], [1.73869446E12, 99.0], [1.73869536E12, 94.0], [1.73869506E12, 94.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.738695E12, 164.0], [1.7386947E12, 130.0], [1.73869464E12, 134.0], [1.7386953E12, 148.0], [1.73869524E12, 144.0], [1.73869494E12, 139.0], [1.73869488E12, 143.0], [1.73869458E12, 137.0], [1.73869452E12, 157.0], [1.73869518E12, 153.0], [1.73869512E12, 132.0], [1.73869482E12, 150.0], [1.73869476E12, 147.0], [1.73869542E12, 132.0], [1.73869446E12, 211.0], [1.73869536E12, 144.0], [1.73869506E12, 136.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73869542E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 118.0, "minX": 1.0, "maxY": 15230.0, "series": [{"data": [[18.0, 223.0], [444.0, 228.0], [433.0, 317.0], [492.0, 284.5], [502.0, 326.0], [533.0, 217.0], [512.0, 267.5], [558.0, 304.0], [587.0, 227.0], [609.0, 210.0], [640.0, 207.5], [655.0, 272.0], [668.0, 231.5], [663.0, 283.0], [659.0, 164.0], [657.0, 239.0], [699.0, 234.0], [677.0, 285.0], [691.0, 235.0], [685.0, 241.0], [672.0, 245.0], [711.0, 239.0], [705.0, 229.0], [720.0, 205.5], [713.0, 226.0], [761.0, 242.0], [760.0, 276.0], [767.0, 192.0], [753.0, 166.5], [750.0, 141.0], [746.0, 203.0], [738.0, 254.0], [762.0, 196.0], [755.0, 148.0], [752.0, 192.5], [741.0, 246.0], [795.0, 193.0], [792.0, 259.0], [786.0, 237.0], [768.0, 158.0], [781.0, 146.0], [793.0, 145.0], [797.0, 156.0], [779.0, 192.0], [777.0, 224.0], [787.0, 202.0], [805.0, 200.0], [826.0, 194.0], [809.0, 177.0], [808.0, 194.0], [828.0, 164.0], [817.0, 132.0], [830.0, 144.0], [822.0, 151.0], [821.0, 151.0], [823.0, 155.0], [810.0, 136.0], [819.0, 144.0], [801.0, 151.0], [800.0, 139.5], [824.0, 159.0], [837.0, 164.0], [853.0, 170.0], [854.0, 150.0], [852.0, 138.5], [850.0, 151.5], [840.0, 163.0], [843.0, 137.0], [844.0, 148.0], [842.0, 168.0], [849.0, 174.0], [845.0, 164.0], [847.0, 166.0], [846.0, 147.0], [836.0, 142.5], [835.0, 152.0], [858.0, 124.0], [856.0, 160.0], [839.0, 161.0], [838.0, 150.0], [862.0, 162.0], [861.0, 164.0], [859.0, 146.0], [889.0, 174.0], [887.0, 161.0], [886.0, 144.0], [885.0, 179.0], [882.0, 222.0], [874.0, 219.0], [864.0, 145.0], [879.0, 167.0], [868.0, 212.0], [869.0, 152.0], [872.0, 158.0], [873.0, 133.0], [881.0, 143.0], [893.0, 142.0], [888.0, 131.5], [871.0, 145.0], [924.0, 198.0], [908.0, 188.5], [912.0, 183.0], [918.0, 157.0], [919.0, 184.0], [913.0, 137.0], [925.0, 207.0], [926.0, 152.0], [927.0, 165.0], [906.0, 213.0], [910.0, 210.0], [897.0, 159.0], [898.0, 138.0], [900.0, 233.0], [896.0, 146.0], [901.0, 201.0], [923.0, 184.0], [903.0, 136.0], [922.0, 160.0], [907.0, 149.0], [958.0, 197.0], [929.0, 193.0], [936.0, 128.5], [941.0, 156.0], [938.0, 212.5], [937.0, 174.0], [930.0, 186.0], [948.0, 197.5], [933.0, 212.0], [950.0, 181.0], [949.0, 134.0], [944.0, 174.0], [957.0, 183.0], [952.0, 138.0], [953.0, 173.0], [947.0, 163.0], [935.0, 165.0], [934.0, 147.0], [988.0, 181.0], [963.0, 204.0], [977.0, 182.0], [979.0, 141.0], [960.0, 173.0], [961.0, 135.0], [975.0, 208.0], [973.0, 199.0], [967.0, 125.0], [985.0, 191.0], [966.0, 193.5], [964.0, 212.0], [989.0, 176.0], [991.0, 139.0], [990.0, 169.0], [981.0, 163.0], [980.0, 156.0], [997.0, 154.0], [1009.0, 167.0], [1014.0, 171.5], [1000.0, 163.0], [1006.0, 160.5], [1003.0, 181.0], [1002.0, 141.5], [996.0, 172.0], [993.0, 169.5], [1012.0, 141.0], [1013.0, 139.0], [1011.0, 170.0], [992.0, 133.0], [1023.0, 133.0], [1008.0, 152.5], [1019.0, 145.0], [1020.0, 154.0], [1021.0, 149.0], [1022.0, 152.5], [1017.0, 163.0], [1016.0, 163.0], [999.0, 181.0], [998.0, 147.0], [1015.0, 133.0], [1033.0, 136.0], [1049.0, 188.0], [1046.0, 133.0], [1045.0, 132.0], [1047.0, 142.0], [1048.0, 135.0], [1055.0, 135.0], [1032.0, 133.0], [1028.0, 171.0], [1029.0, 163.0], [1025.0, 139.0], [1024.0, 143.0], [1026.0, 153.0], [1031.0, 165.0], [1054.0, 137.5], [1053.0, 149.0], [1043.0, 135.0], [1042.0, 133.0], [1041.0, 129.0], [1040.0, 132.0], [1036.0, 132.0], [1034.0, 143.0], [1035.0, 153.0], [1039.0, 138.5], [1037.0, 158.0], [1038.0, 169.5], [1075.0, 132.0], [1074.0, 131.0], [1072.0, 143.0], [1076.0, 137.0], [1077.0, 137.0], [1078.0, 140.0], [1083.0, 130.0], [1082.0, 134.0], [1081.0, 152.0], [1079.0, 178.0], [1044.0, 132.0], [1071.0, 148.0], [1070.0, 152.0], [1069.0, 125.0], [1067.0, 138.0], [1068.0, 133.0], [1062.0, 144.0], [1061.0, 129.0], [1065.0, 162.0], [1063.0, 131.0], [1060.0, 126.0], [1058.0, 167.0], [1059.0, 167.0], [1066.0, 150.0], [1057.0, 145.0], [1085.0, 136.0], [1086.0, 140.0], [1056.0, 136.0], [1087.0, 126.0], [1084.0, 133.0], [1050.0, 137.0], [1051.0, 126.0], [1052.0, 137.0], [1137.0, 135.0], [1111.0, 136.0], [1094.0, 134.0], [1099.0, 133.0], [1096.0, 126.0], [1095.0, 130.0], [1098.0, 157.0], [1097.0, 139.0], [1103.0, 134.0], [1136.0, 138.0], [1102.0, 133.0], [1100.0, 145.0], [1101.0, 153.0], [1091.0, 128.0], [1090.0, 138.0], [1092.0, 133.0], [1093.0, 132.0], [1089.0, 131.0], [1088.0, 130.0], [1119.0, 138.0], [1105.0, 133.0], [1108.0, 137.0], [1107.0, 138.0], [1106.0, 143.0], [1141.0, 140.0], [1140.0, 136.0], [1138.0, 138.0], [1139.0, 131.0], [1145.0, 136.0], [1144.0, 134.0], [1142.0, 139.0], [1143.0, 137.0], [1150.0, 135.0], [1151.0, 133.0], [1122.0, 134.5], [1121.0, 140.0], [1120.0, 138.0], [1149.0, 135.0], [1146.0, 144.0], [1147.0, 138.0], [1148.0, 136.0], [1125.0, 127.0], [1124.0, 139.0], [1123.0, 133.0], [1132.0, 137.0], [1131.0, 138.0], [1134.0, 134.0], [1135.0, 142.0], [1133.0, 148.0], [1128.0, 130.0], [1129.0, 126.0], [1127.0, 126.0], [1130.0, 136.0], [1118.0, 138.0], [1116.0, 131.0], [1113.0, 138.0], [1112.0, 156.0], [1114.0, 136.0], [1115.0, 133.0], [1117.0, 142.0], [1109.0, 134.0], [1110.0, 135.0], [1126.0, 137.0], [1159.0, 134.0], [1192.0, 134.0], [1189.0, 141.0], [1185.0, 147.0], [1186.0, 139.0], [1187.0, 139.0], [1188.0, 137.0], [1191.0, 134.0], [1190.0, 135.5], [1193.0, 139.0], [1194.0, 130.0], [1195.0, 135.0], [1197.0, 147.0], [1196.0, 130.0], [1198.0, 139.0], [1199.0, 137.0], [1184.0, 133.0], [1161.0, 134.0], [1160.0, 137.0], [1166.0, 138.0], [1206.0, 134.0], [1214.0, 137.0], [1215.0, 130.0], [1211.0, 140.0], [1212.0, 149.0], [1208.0, 131.0], [1207.0, 140.0], [1210.0, 134.0], [1209.0, 135.0], [1213.0, 142.0], [1201.0, 139.0], [1202.0, 139.0], [1204.0, 125.0], [1203.0, 131.0], [1167.0, 141.0], [1200.0, 138.0], [1165.0, 137.0], [1164.0, 133.0], [1163.0, 144.0], [1162.0, 133.0], [1173.0, 132.5], [1171.0, 139.0], [1170.0, 140.0], [1168.0, 145.0], [1169.0, 133.0], [1177.0, 136.0], [1182.0, 140.0], [1183.0, 141.0], [1152.0, 139.0], [1178.0, 140.0], [1180.0, 134.0], [1179.0, 134.0], [1181.0, 136.0], [1176.0, 138.0], [1175.0, 136.0], [1174.0, 141.0], [1153.0, 149.0], [1155.0, 144.0], [1154.0, 143.0], [1156.0, 133.0], [1158.0, 140.0], [1157.0, 140.0], [1227.0, 144.0], [1242.0, 135.0], [1225.0, 129.0], [1226.0, 129.0], [1222.0, 132.0], [1217.0, 139.0], [1219.0, 133.0], [1220.0, 130.0], [1221.0, 145.0], [1223.0, 137.0], [1224.0, 135.0], [1253.0, 130.0], [1252.0, 132.0], [1249.0, 141.0], [1250.0, 139.0], [1255.0, 136.0], [1254.0, 137.0], [1257.0, 140.0], [1259.0, 140.0], [1263.0, 128.0], [1237.0, 138.0], [1235.0, 146.0], [1238.0, 135.0], [1240.0, 136.0], [1239.0, 125.0], [1241.0, 134.0], [1276.0, 134.0], [1272.0, 134.0], [1230.0, 134.0], [1231.0, 141.0], [1267.0, 140.0], [1270.0, 129.0], [1265.0, 140.0], [1264.0, 142.0], [1248.0, 132.0], [1232.0, 160.0], [1234.0, 131.5], [1216.0, 136.0], [1245.0, 135.0], [1244.0, 151.0], [1286.0, 129.0], [1299.0, 139.0], [1287.0, 131.0], [1289.0, 143.0], [1300.0, 139.0], [1283.0, 134.0], [1298.0, 128.0], [1281.0, 123.0], [1301.0, 140.0], [1305.0, 124.0], [1315.0, 135.0], [1332.0, 135.0], [1.0, 15230.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[753.0, 118.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 1332.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 118.0, "minX": 1.0, "maxY": 15230.0, "series": [{"data": [[18.0, 222.5], [444.0, 228.0], [433.0, 317.0], [492.0, 282.5], [502.0, 326.0], [533.0, 216.0], [512.0, 267.5], [558.0, 303.5], [587.0, 226.0], [609.0, 210.0], [640.0, 204.5], [655.0, 272.0], [668.0, 231.0], [663.0, 283.0], [659.0, 164.0], [657.0, 239.0], [699.0, 233.0], [677.0, 285.0], [691.0, 234.0], [685.0, 241.0], [672.0, 245.0], [711.0, 237.0], [705.0, 228.0], [720.0, 205.5], [713.0, 226.0], [761.0, 241.0], [760.0, 276.0], [767.0, 190.0], [753.0, 164.0], [750.0, 140.5], [746.0, 203.0], [738.0, 253.0], [762.0, 194.5], [755.0, 147.0], [752.0, 192.5], [741.0, 246.0], [795.0, 192.0], [792.0, 257.5], [786.0, 236.0], [768.0, 157.5], [781.0, 146.0], [793.0, 145.0], [797.0, 156.0], [779.0, 192.0], [777.0, 224.0], [787.0, 198.0], [805.0, 200.0], [826.0, 192.0], [809.0, 175.0], [808.0, 193.0], [828.0, 163.0], [817.0, 132.0], [830.0, 143.5], [822.0, 149.5], [821.0, 150.0], [823.0, 155.0], [810.0, 135.0], [819.0, 141.0], [801.0, 149.0], [800.0, 136.5], [824.0, 158.5], [837.0, 164.0], [853.0, 167.0], [854.0, 150.0], [852.0, 138.0], [850.0, 151.0], [840.0, 160.0], [843.0, 136.0], [844.0, 146.5], [842.0, 167.0], [849.0, 174.0], [845.0, 163.0], [847.0, 165.0], [846.0, 145.0], [836.0, 142.0], [835.0, 152.0], [858.0, 124.0], [856.0, 160.0], [839.0, 161.0], [838.0, 147.0], [862.0, 162.0], [861.0, 164.0], [859.0, 145.0], [889.0, 173.0], [887.0, 160.0], [886.0, 143.0], [885.0, 177.0], [882.0, 222.0], [874.0, 218.0], [864.0, 143.5], [879.0, 166.0], [868.0, 211.5], [869.0, 151.0], [872.0, 157.0], [873.0, 131.0], [881.0, 141.0], [893.0, 142.0], [888.0, 131.0], [871.0, 144.0], [924.0, 197.0], [908.0, 188.0], [912.0, 182.0], [918.0, 155.0], [919.0, 184.0], [913.0, 137.0], [925.0, 207.0], [926.0, 152.0], [927.0, 165.0], [906.0, 212.5], [910.0, 209.0], [897.0, 157.0], [898.0, 138.0], [900.0, 233.0], [896.0, 145.0], [901.0, 200.0], [923.0, 183.0], [903.0, 136.0], [922.0, 160.0], [907.0, 148.0], [958.0, 197.0], [929.0, 193.0], [936.0, 127.5], [941.0, 156.0], [938.0, 210.0], [937.0, 173.0], [930.0, 184.0], [948.0, 196.0], [933.0, 212.0], [950.0, 179.0], [949.0, 134.0], [944.0, 174.0], [957.0, 182.5], [952.0, 136.0], [953.0, 172.0], [947.0, 163.0], [935.0, 165.0], [934.0, 147.0], [988.0, 180.0], [963.0, 203.5], [977.0, 181.5], [979.0, 141.0], [960.0, 171.5], [961.0, 134.0], [975.0, 208.0], [973.0, 199.0], [967.0, 125.0], [985.0, 191.0], [966.0, 193.0], [964.0, 211.0], [989.0, 175.0], [991.0, 139.0], [990.0, 168.0], [981.0, 163.0], [980.0, 156.0], [997.0, 154.0], [1009.0, 167.0], [1014.0, 170.0], [1000.0, 161.0], [1006.0, 160.0], [1003.0, 180.0], [1002.0, 140.0], [996.0, 171.0], [993.0, 169.0], [1012.0, 139.5], [1013.0, 139.0], [1011.0, 170.0], [992.0, 133.0], [1023.0, 133.0], [1008.0, 152.0], [1019.0, 144.0], [1020.0, 154.0], [1021.0, 149.0], [1022.0, 152.0], [1017.0, 163.0], [1016.0, 162.0], [999.0, 181.0], [998.0, 146.5], [1015.0, 132.0], [1033.0, 135.0], [1049.0, 187.0], [1046.0, 132.0], [1045.0, 131.0], [1047.0, 141.0], [1048.0, 134.0], [1055.0, 134.0], [1032.0, 133.0], [1028.0, 171.0], [1029.0, 162.0], [1025.0, 139.0], [1024.0, 142.0], [1026.0, 152.0], [1031.0, 165.0], [1054.0, 136.0], [1053.0, 149.0], [1043.0, 134.0], [1042.0, 132.0], [1041.0, 129.0], [1040.0, 131.0], [1036.0, 132.0], [1034.0, 142.0], [1035.0, 153.0], [1039.0, 138.0], [1037.0, 158.0], [1038.0, 169.0], [1075.0, 132.0], [1074.0, 130.0], [1072.0, 143.0], [1076.0, 136.0], [1077.0, 136.0], [1078.0, 139.0], [1083.0, 129.0], [1082.0, 132.0], [1081.0, 150.0], [1079.0, 178.0], [1044.0, 132.0], [1071.0, 147.0], [1070.0, 151.0], [1069.0, 125.0], [1067.0, 138.0], [1068.0, 133.0], [1062.0, 143.0], [1061.0, 129.0], [1065.0, 162.0], [1063.0, 130.0], [1060.0, 125.0], [1058.0, 167.0], [1059.0, 166.0], [1066.0, 150.0], [1057.0, 145.0], [1085.0, 136.0], [1086.0, 139.0], [1056.0, 136.0], [1087.0, 126.0], [1084.0, 133.0], [1050.0, 136.0], [1051.0, 126.0], [1052.0, 136.0], [1137.0, 135.0], [1111.0, 136.0], [1094.0, 133.0], [1099.0, 133.0], [1096.0, 126.0], [1095.0, 130.0], [1098.0, 155.0], [1097.0, 139.0], [1103.0, 134.0], [1136.0, 137.0], [1102.0, 133.0], [1100.0, 145.0], [1101.0, 153.0], [1091.0, 128.0], [1090.0, 137.0], [1092.0, 132.0], [1093.0, 130.0], [1089.0, 130.0], [1088.0, 129.0], [1119.0, 137.0], [1105.0, 132.0], [1108.0, 136.0], [1107.0, 137.0], [1106.0, 142.0], [1141.0, 140.0], [1140.0, 136.0], [1138.0, 137.0], [1139.0, 130.0], [1145.0, 135.0], [1144.0, 133.0], [1142.0, 138.0], [1143.0, 137.0], [1150.0, 135.0], [1151.0, 133.0], [1122.0, 134.0], [1121.0, 140.0], [1120.0, 137.0], [1149.0, 135.0], [1146.0, 143.0], [1147.0, 137.0], [1148.0, 136.0], [1125.0, 127.0], [1124.0, 139.0], [1123.0, 133.0], [1132.0, 137.0], [1131.0, 138.0], [1134.0, 133.0], [1135.0, 141.0], [1133.0, 148.0], [1128.0, 130.0], [1129.0, 125.0], [1127.0, 126.0], [1130.0, 136.0], [1118.0, 137.0], [1116.0, 131.0], [1113.0, 137.5], [1112.0, 155.5], [1114.0, 135.0], [1115.0, 132.0], [1117.0, 141.0], [1109.0, 134.0], [1110.0, 135.0], [1126.0, 137.0], [1159.0, 134.0], [1192.0, 133.0], [1189.0, 140.0], [1185.0, 147.0], [1186.0, 137.0], [1187.0, 137.0], [1188.0, 136.0], [1191.0, 133.0], [1190.0, 135.0], [1193.0, 139.0], [1194.0, 130.0], [1195.0, 135.0], [1197.0, 146.0], [1196.0, 130.0], [1198.0, 139.0], [1199.0, 137.0], [1184.0, 133.0], [1161.0, 133.0], [1160.0, 137.0], [1166.0, 138.0], [1206.0, 134.0], [1214.0, 137.0], [1215.0, 129.0], [1211.0, 139.0], [1212.0, 148.0], [1208.0, 131.0], [1207.0, 139.0], [1210.0, 134.0], [1209.0, 134.0], [1213.0, 141.0], [1201.0, 139.0], [1202.0, 138.0], [1204.0, 124.0], [1203.0, 130.0], [1167.0, 141.0], [1200.0, 137.0], [1165.0, 136.0], [1164.0, 132.0], [1163.0, 143.0], [1162.0, 132.0], [1173.0, 132.0], [1171.0, 138.0], [1170.0, 140.0], [1168.0, 145.0], [1169.0, 133.0], [1177.0, 135.0], [1182.0, 139.0], [1183.0, 140.0], [1152.0, 139.0], [1178.0, 139.0], [1180.0, 133.0], [1179.0, 133.0], [1181.0, 136.0], [1176.0, 137.0], [1175.0, 135.0], [1174.0, 141.0], [1153.0, 148.0], [1155.0, 144.0], [1154.0, 142.5], [1156.0, 132.0], [1158.0, 139.0], [1157.0, 139.0], [1227.0, 143.0], [1242.0, 134.0], [1225.0, 129.0], [1226.0, 129.0], [1222.0, 131.0], [1217.0, 138.0], [1219.0, 133.0], [1220.0, 129.0], [1221.0, 144.0], [1223.0, 137.0], [1224.0, 134.0], [1253.0, 129.0], [1252.0, 131.0], [1249.0, 140.0], [1250.0, 138.0], [1255.0, 136.0], [1254.0, 136.0], [1257.0, 140.0], [1259.0, 140.0], [1263.0, 127.0], [1237.0, 137.0], [1235.0, 145.0], [1238.0, 134.5], [1240.0, 135.0], [1239.0, 124.0], [1241.0, 134.0], [1276.0, 133.0], [1272.0, 134.0], [1230.0, 133.0], [1231.0, 140.0], [1267.0, 139.0], [1270.0, 128.0], [1265.0, 140.0], [1264.0, 142.0], [1248.0, 132.0], [1232.0, 159.5], [1234.0, 131.0], [1216.0, 135.0], [1245.0, 134.0], [1244.0, 151.0], [1286.0, 129.0], [1299.0, 139.0], [1287.0, 131.0], [1289.0, 143.0], [1300.0, 138.0], [1283.0, 133.0], [1298.0, 127.0], [1281.0, 122.0], [1301.0, 139.0], [1305.0, 124.0], [1315.0, 135.0], [1332.0, 135.0], [1.0, 15230.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[753.0, 118.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 1332.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 163.96666666666667, "minX": 1.73869446E12, "maxY": 1176.4, "series": [{"data": [[1.738695E12, 1035.2666666666667], [1.7386947E12, 1052.2166666666667], [1.73869464E12, 1081.6], [1.7386953E12, 1164.45], [1.73869524E12, 1118.8333333333333], [1.73869494E12, 1150.9166666666667], [1.73869488E12, 1176.4], [1.73869458E12, 883.0833333333334], [1.73869452E12, 886.4333333333333], [1.73869518E12, 1125.5833333333333], [1.73869512E12, 1106.5666666666666], [1.73869482E12, 1135.1833333333334], [1.73869476E12, 1092.6666666666667], [1.73869542E12, 163.96666666666667], [1.73869446E12, 319.5], [1.73869536E12, 1077.9666666666667], [1.73869506E12, 1096.0333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73869542E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.73869446E12, "maxY": 1176.4, "series": [{"data": [[1.738695E12, 1035.2666666666667], [1.7386947E12, 1052.2166666666667], [1.73869464E12, 1081.6], [1.7386953E12, 1164.45], [1.73869524E12, 1118.8333333333333], [1.73869494E12, 1150.9166666666667], [1.73869488E12, 1176.4], [1.73869458E12, 883.0666666666667], [1.73869452E12, 886.4333333333333], [1.73869518E12, 1125.5833333333333], [1.73869512E12, 1106.5666666666666], [1.73869482E12, 1135.1833333333334], [1.73869476E12, 1092.6666666666667], [1.73869542E12, 167.3], [1.73869446E12, 316.1666666666667], [1.73869536E12, 1077.9666666666667], [1.73869506E12, 1096.0333333333333]], "isOverall": false, "label": "201", "isController": false}, {"data": [[1.73869458E12, 0.016666666666666666]], "isOverall": false, "label": "400", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73869542E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.73869446E12, "maxY": 1176.4, "series": [{"data": [[1.73869458E12, 0.016666666666666666]], "isOverall": false, "label": "Account create-failure", "isController": false}, {"data": [[1.738695E12, 1035.2666666666667], [1.7386947E12, 1052.2166666666667], [1.73869464E12, 1081.6], [1.7386953E12, 1164.45], [1.73869524E12, 1118.8333333333333], [1.73869494E12, 1150.9166666666667], [1.73869488E12, 1176.4], [1.73869458E12, 883.0666666666667], [1.73869452E12, 886.4333333333333], [1.73869518E12, 1125.5833333333333], [1.73869512E12, 1106.5666666666666], [1.73869482E12, 1135.1833333333334], [1.73869476E12, 1092.6666666666667], [1.73869542E12, 167.3], [1.73869446E12, 316.1666666666667], [1.73869536E12, 1077.9666666666667], [1.73869506E12, 1096.0333333333333]], "isOverall": false, "label": "Account create-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73869542E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.73869446E12, "maxY": 1176.4, "series": [{"data": [[1.738695E12, 1035.2666666666667], [1.7386947E12, 1052.2166666666667], [1.73869464E12, 1081.6], [1.7386953E12, 1164.45], [1.73869524E12, 1118.8333333333333], [1.73869494E12, 1150.9166666666667], [1.73869488E12, 1176.4], [1.73869458E12, 883.0666666666667], [1.73869452E12, 886.4333333333333], [1.73869518E12, 1125.5833333333333], [1.73869512E12, 1106.5666666666666], [1.73869482E12, 1135.1833333333334], [1.73869476E12, 1092.6666666666667], [1.73869542E12, 167.3], [1.73869446E12, 316.1666666666667], [1.73869536E12, 1077.9666666666667], [1.73869506E12, 1096.0333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.73869458E12, 0.016666666666666666]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73869542E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

