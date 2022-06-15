// La clase Fund es la encargada de crear el objeto fund que contiene los datos del fondo que se utilizan para realizar
// la simulación de los retornos esperados mediante el método expectedReturns, getHtml devuelve los elementos para renderizar y getPeriod el
// periodo de inversión del usuario.
export class fund {
    constructor(name, realistic, optimistic, pessimistic, years, initialDeposit, monthlyDeposit){
        this.name = name;
        this.realistic = realistic; 
        this.optimistic = optimistic;
        this.pessimistic = pessimistic;
        this.years = years;
        this.initialDeposit = initialDeposit;
        this.monthlyDeposit = monthlyDeposit;
        this.totalDeposit = ((years * 12 ) * monthlyDeposit) + initialDeposit;
        this.returns = this.expectedReturns(); 
      
    }
    expectedReturns(){
  	    const MONTHS = this.years * 12;
        let interests = [this.realistic, this.optimistic, this.pessimistic];
        const EXPECTED_RETURNS = [];
        interests = interests.map((el)=>{
            const TOTAL = [];
            for(let i = 1; i <= MONTHS; i++){
                let sum = 0;
                sum += Math.round(this.initialDeposit* Math.pow((1 + el), i));
                
                for(let j = 0; j<i; j++){
                    sum += Math.round(this.monthlyDeposit * Math.pow((1 + el), j));
         
                }
                TOTAL.push(sum);
                sum = 0;
                
            }

            EXPECTED_RETURNS.push(TOTAL);

        });
 		
        return EXPECTED_RETURNS;
       
    }
    getHtml(params){

        return` 
                <div class="realistic-scenario">
                    <div class="realistic-heading">
                        <p id="result-years">En ${this.years} años podrías tener ⬇️</p>
                        <p id="user-fund">Fondo ${this.name}</p>
                    </div>
                    <p id="result-realistic">$${params(this.returns[0].at(-1))}</p>
                </div>
                <div class="scenarios-container">
                    <div>
                        <p class="header-results">Habrías invertido</p>
                        <p id="result-total" class="info-res">$${params(this.totalDeposit)}</p>
                    </div>
                    <div>
                        <p class="header-results">Escenario optimista</p>
                        <p id="result-optimistic" class="info-res">$${params(this.returns[1].at(-1))}</p>
                    </div>
                    <div>
                        <p class="header-results">Escenario pesimista</p>
                        <p id="result-pessimistic" class="info-res">$${params(this.returns[2].at(-2))}</p>
                    </div>
                </div>
                <div class="graph">
                    <canvas id="myChart" width="440" height="224">
                    </canvas>
                </div> `;
    
    }
    getPeriod(){
        const period = [];
        for (let i = 0; i < this.years * 12; i++) {
            period.push(i);
        }
        return period;  
    }
};