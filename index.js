//BMI CALCULATOR 
//formula for BMI
function calculateBMI (weightInKg, heightInM) {
    return BMI = weightInKg / (heightInM * heightInM);
}
//calculator for ideal weight (22.5 is ideal age)
function calculateIdealWeight(heightInM) {
    return 22.5 * heightInM * heightInM;
}
//

function calculateBMR (weightInKg, heightInM, age, gender) {
    const heightInCm = heightInM * 100
    if (gender === "m") {
        BMR = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 50;
    } else {
        BMR = 10 * weightInKg + 6.25 * heightInCm - 5 * age -150;
    }
    return BMR;
}
//calculate daily calories (normal life is BMR * 1.4)
function calculateDailyCalories(BMR, DailyExercise){
return DailyExercise === "yes"
? BMR * 1.4
: BMR * 1.6;
}

function calculateDietWeeks(weightgLose) {
    return Math.abs(weightgLose / 0.5);
}
function calculateDietCalories(weightgLose, dailyCalories) {
    return weightgLose > 0
    ? dailyCalories - 500
    : dailyCalories + 500;
}

function validaIputs (argv) {
    if (argv.length !== 7) {
        console.log(`
        you gave ${argv.length - 2} arguments to the program 
        Please provide 5 arguments for
        weight (kg),
        height (M).
        age (years),
        wether you exercise daily (yes or no)
        and your gender (m or f)
        Exemplo : 82 1.79 32 yes m
        `)
        process.exit();
        
}
}
function validationWeightHeightAge (weightInKg, heightInM, age, argv) {
    if (isNaN(weightInKg) || isNaN(heightInM)|| isNaN(age)) {
console.log(`
Please make sure weight, height and age are numbers:

weight (kg) example: 82 | your input: ${argv[2]}
height (m) example 1.79 | your input: ${argv[3]}
age (years) example 32  | your input: ${argv[4]} 

$ node index.js 82 1.79 32 yes m
`)

    process.exit();
}
if (age < 20) {
    console.log(`
    This app is for person over 20.
    `)
    process.exit();
}
if (weightInKg < 30 || weightInKg > 300) {
console.log(`
    Please enter your age in kilograma.
    If your weight is between 30 and 300 check your weight again ${weightInKg}
`);
process.exit();
}
}
function validareDailyExercise(dailyExercise) {
   if (dailyExercise !== "yes" && dailyExercise ==! "no") {
       console.log(`
       Please especificy if you praticce exercice with "yes" or "no"
       Enter your answer ${dailyExercise}
       `);
       process.exit();
   } 
}

function validadeGender(gender) {
    if (gender !== "f" && gender !== "m") {
        console.log(`
        Please specify your gender with male "m" and famale "f"
        Enter your gender ${gender}
        `);
        process.exit();
    }
}
//format user (output)
function formatOutput(userObject) {
    return `
        **************
        BMI CALCULATOR
        **************
    
        age: ${userObject.age} years
        gender: ${userObject.gender}
        height: ${userObject.heightInM} m
        weight: ${userObject.weightInKg} kg
        do you exercise daily? ${userObject.dailyExercise}
    
        ****************
        FACING THE FACTS
        ****************
    
        Your BMI is ${Math.round(userObject.BMI)}
    
        A BMI under 18.5 is considered underweight
        A BMI above 25 is considered overweight
    
        Your ideal weight is ${Math.round(userObject.weightInKg)} kg
        With a normal lifestyle you burn ${Math.round(userObject.dailyCalories)} calories a day
    
        **********
        DIET PLAN
        **********
    
        If you want to reach your ideal weight of ${Math.round(userObject.idealWeightKg)} kg:
    
        Eat ${Math.round(userObject.dietCalories)} calories a day
        For ${Math.round(userObject.dietWeeks)} weeks
        `;
  }
  


function bmicalculator() {
    validaIputs (process.argv);
  
  const weightInKg    = parseInt(process.argv[2]);
  const heightInM     = parseFloat(process.argv[3]);
  const age           = parseInt(process.argv[4]);
  const dailyExercise = process.argv[5];
  const gender        = process.argv[6];

  validationWeightHeightAge (weightInKg, heightInM, age, gender);
  validareDailyExercise (dailyExercise);
  validadeGender (gender);

  const BMI             = calculateBMI(weightInKg, heightInM);
  const idealWeightKg   = calculateIdealWeight(heightInM);
  const BMR             = calculateBMR(weightInKg, heightInM, age, gender);
  const dailyCalories   = calculateDailyCalories(BMR, dailyExercise);
  const weightToLoseKg  = Math.abs(weightInKg - idealWeightKg);
  const dietWeeks       = calculateDietWeeks(weightToLoseKg);
  const dietCalories    = calculateDietCalories(weightToLoseKg, dailyCalories);

  const user = { 
    weightInKg: weightInKg,
    heightInM: heightInM,
    age: age,
    dailyExercise: dailyExercise,
    gender: gender,
    BMI: BMI,
    idealWeightKg: idealWeightKg,
    dailyCalories: dailyCalories,
    weightToLoseKg: weightToLoseKg,
    dietWeeks: dietWeeks,
    dietCalories: dietCalories
   };

   const output = formatOutput(user);
   console.log(output);
}
bmicalculator();