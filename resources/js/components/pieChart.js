import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chart from 'react-apexcharts'
class Donut extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [],
        options: {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: [],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
      
      
      };
    }
    componentDidMount(){
        let bla=[];
        let bla2=[];
      axios.get('/categories').then(response => {
          
          for (let i=0;i<response.data.length;i++)
          {
              /* this.setState({series:response.data[i].counter});
              this.setState({labels:this.state.labels.push(response.data[i].name)}); */
              bla.push(response.data[i].counter);
              bla2.push(response.data[i].name);
          }
          
          this.setState({series:bla});
          this.setState({options:{
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: bla2,
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          }})
         
        }).catch(errors => {
          console.log(errors);
        });
        
    }
  

    render() {
      
        return (
        


  <div id="chart">
<Chart options={this.state.options} series={this.state.series} type="pie" width={380} />
</div>



      );
    }
  }


export default Donut;
        
let pieChartToggleBtn=false;
let pieChartBtn = document.getElementById('pieChartBtn');
pieChartBtn.onclick = () => {
  pieChartToggleBtn=!pieChartToggleBtn;
  if(pieChartToggleBtn)
  ReactDOM.render(<Donut />, document.getElementById('pieChart'));
  else ReactDOM.render('', document.getElementById('pieChart'));
}