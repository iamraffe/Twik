import { statage } from './statage'
import { wtage } from './wtage'
import { bmiage } from './bmiagerev'
import { leanageinf } from './leanageinf'
import { wtageinf } from './wtageinf'

export const chartTypes = {
  Afp: {
    threshold: (sex, age, diabetes) => {
      return  {
                ext_over: null,
                over: 4.5,
                under: 1.6,
                ext_under: null
              }
    },
    color: ['#383F47', '#F1CC28', '#B35252', '#63B28F'],
    symbols: ["Afp"],
    unit: "ng/mL"
  },
  Alt: {
    threshold: (sex, age, diabetes) => {
      return  {
                ext_over: null,
                over: 29,
                under: 6,
                ext_under: null
              }
    },
    color: ['#383F47', '#F1CC28', '#B35252', '#63B28F'],
    symbols: ["Alt"],
    unit: "units/L"
  },
  Calcium: {
    threshold: (sex, age, diabetes) => {
      return  {
                ext_over: null,
                over: 10.3,
                under: 8.6,
                ext_under: null
              }
    },
    color: ['#383F47', '#F1CC28', '#B35252', '#63B28F'],
    symbols: ["Calcium"],
    unit: "ng/mL"
  },
  Copper: {
    threshold: (sex, age, diabetes) => {
      return  {
                ext_over: null,
                over: null,
                under: null,
                ext_under: null
              }
    },
    color: ['#383F47', '#F1CC28', '#B35252', '#63B28F'],
    symbols: ["Copper"],
    unit: ""
  },
  Creatine: {
    threshold: (sex, age, diabetes) => {
      return  {
                ext_over: null,
                over: null,
                under: null,
                ext_under: null
              }
    },
    color: ['#383F47', '#F1CC28', '#B35252', '#63B28F'],
    symbols: ["Creatine"],
    unit: ""
  },
  DiastolicBloodPressure: {
    threshold: (sex, age, diabetes) => {
      return  {
                ext_over: null,
                over: diabetes ? 80 : 90,
                under: 50,
                ext_under: null
              }
    },
    color: ['#383F47', '#F1CC28', '#B35252', '#63B28F'],
    symbols: ["DiastolicBloodPressure"],
    unit: "mmHg"
  },
  Ferritin: {
    threshold: (sex, age, diabetes) => {
      return  {
                ext_over: null,
                over: sex === "M" ? 232 : 380,
                under: 10,
                ext_under: null
              }
    },
    color: ['#383F47', '#F1CC28', '#B35252', '#63B28F'],
    symbols: ["Ferritin"],
    unit: "ng/mL"
  },
  Folate: {
    threshold: (sex, age, diabetes) => {
      return  {
                ext_over: null,
                over: 50,
                under: 0,
                ext_under: null
              }
    },
    color: ['#383F47', '#F1CC28', '#B35252', '#63B28F'],
    symbols: ["Folate"],
    unit: ""
  },
  HemoglobinA1c: {
    threshold: (sex, age, diabetes) => {
      return  {
                ext_over: diabetes ? null : 6.5,
                over: diabetes ? (age < 65 ? 6.5 : 7.5) : 5.7,
                under: null,
                ext_under: null
              }
    },
    color: ['#383F47', '#F1CC28', '#B35252', '#63B28F'],
    symbols: ["HemoglobinA1c"],
    unit: "%"
  },
  Insulin: {
    threshold: (sex, age, diabetes) => {
      return  {
                ext_over: null,
                over: null,
                under: null,
                ext_under: null
              }
    },
    color: ['#383F47', '#F1CC28', '#B35252', '#63B28F'],
    symbols: ["Insulin"],
    unit: ""
  },
  Iron: {
    threshold: (sex, age, diabetes) => {
      return  {
                ext_over: null,
                over: null,
                under: null,
                ext_under: null
              }
    },
    color: ['#383F47', '#F1CC28', '#B35252', '#63B28F'],
    symbols: ["Iron"],
    unit: ""
  },
  Mercury: {
    threshold: (sex, age, diabetes) => {
      return  {
                ext_over: null,
                over: 10,
                under: 0,
                ext_under: null
              }
    },
    color: ['#383F47', '#F1CC28', '#B35252', '#63B28F'],
    symbols: ["Mercury"],
    unit: "mcg/L"
  },
  RedBloodCellCount: {
    threshold: (sex, age, diabetes) => {
      return  {
                ext_over: null,
                over: null,
                under: null,
                ext_under: null
              }
    },
    color: ['#383F47', '#F1CC28', '#B35252', '#63B28F'],
    symbols: ["RedBloodCellCount"],
    unit: ""
  },
  SystolicBloodPressure: {
    threshold: (sex, age, diabetes) => {
      return  {
                ext_over: null,
                over: diabetes ? 120 : 140,
                under: 90,
                ext_under: null
              }
    },
    color: ['#383F47', '#F1CC28', '#B35252', '#63B28F'],
    symbols: ["SystolicBloodPressure"],
    unit: "mmHg"
  },
  Testosterone: {
    threshold: (sex, age, diabetes) => {
      return  {
                ext_over: null,
                over: 1100,
                under: 200,
                ext_under: null
              }
    },
    color: ['#383F47', '#F1CC28', '#B35252', '#63B28F'],
    symbols: ["Testosterone"],
    unit: "ng/dL"
  },
  Tsh: {
    threshold: (sex, age, diabetes) => {
      return  {
                ext_over: null,
                over: 4.5,
                under: 0.4,
                ext_under: null
              }
    },
    color: ['#383F47', '#F1CC28', '#B35252', '#63B28F'],
    symbols: ["Tsh"],
    unit: "mIU/L"
  },
  UricAcid: {
    threshold: (sex, age, diabetes) => {
      return  {
                ext_over: null,
                over: 6,
                under: null,
                ext_under: null
              }
    },
    color: ['#383F47', '#F1CC28', '#B35252', '#63B28F'],
    symbols: ["UricAcid"],
    unit: "mg/dL"
  },
  ViralLoad: {
    threshold: (sex, age, diabetes) => {
      return  {
                ext_over: null,
                over: null,
                under: null,
                ext_under: null
              }
    },
    color: ['#383F47', '#F1CC28', '#B35252', '#63B28F'],
    symbols: ["ViralLoad"],
    unit: ""
  },
  VitaminB12: {
    threshold: (sex, age, diabetes) => {
      return  {
                ext_over: null,
                over: 400,
                under: 200,
                ext_under: null
              }
    },
    color: ['#383F47', '#F1CC28', '#B35252', '#63B28F'],
    symbols: ["VitaminB12"],
    unit: "pg/mL"
  },
  VitaminD: {
    threshold: (sex, age, diabetes) => {
      return  {
                ext_over: null,
                over: 100,
                under: 20,
                ext_under: null
              }
    },
    color: ['#383F47', '#F1CC28', '#B35252', '#63B28F'],
    symbols: ["VitaminD"],
    unit: "ng/L"
  },
  WhiteBloodCellCount: {
    threshold: (sex, age, diabetes) => {
      return  {
                ext_over: null,
                over: 10.8,
                under: 3.8,
                ext_under: null
              }
    },
    color: ['#383F47', '#F1CC28', '#B35252', '#63B28F'],
    symbols: ["WhiteBloodCellCount"],
    unit: "1,000uL"
  },
  StatureAge: {
    values: statage,
    yDomain: [70, 200],
    xDomain: [0, 264],
    yLegend: 'cms',
    xLegend: 'Years',
    xTicks: [
      24,
      48,
      72,
      96,
      120,
      144,
      168,
      192,
      216,
      240,
    ],
    symbols: ["STATURE"]
  },
  WeightAge:{
    values: wtage,
    yDomain: [10, 110],
    xDomain: [0, 264],
    yLegend: 'kgs',
    xLegend: 'Years',
    xTicks: [
      24,
      48,
      72,
      96,
      120,
      144,
      168,
      192,
      216,
      240,
    ],
    symbols: ["WEIGHT"]
  },
  BmiAge: {
    values: bmiage,
    yDomain: [12, 36],
    xDomain: [0, 264],
    yLegend: 'kgs/m^2',
    xLegend: 'Years',
    xTicks: [
      24,
      48,
      72,
      96,
      120,
      144,
      168,
      192,
      216,
      240,
    ],
    symbols: ["HEIGHT", "WEIGHT"]
  },
  LengthAgeInfant: {
    values: leanageinf,
    yDomain: [40, 110],
    xDomain: [-3, 39],
    yLegend: 'cms',
    xLegend: 'Months',
    xTicks: [
      0,
      3,
      6,
      9,
      12,
      15,
      18,
      21,
      24,
      27,
      30,
      33,
      36
    ],
    symbols: ["LENGTH"]
  },
  WeightAgeInfant: {
    values: wtageinf,
    yDomain: [2, 20],
    xDomain: [-3, 39],
    yLegend: 'kgs',
    xLegend: 'Months',
    xTicks: [
      0,
      3,
      6,
      9,
      12,
      15,
      18,
      21,
      24,
      27,
      30,
      33,
      36
    ],
    symbols: ["WEIGHT"]
  }
}

export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
