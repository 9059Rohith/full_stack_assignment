import { useState } from 'react'
import { Calculator, DollarSign, Award, TrendingUp } from 'lucide-react'

function App() {
  const [basicPay, setBasicPay] = useState('')
  const [grade, setGrade] = useState('')
  const [bonus, setBonus] = useState(null)

  // Calculate salary components
  const calculateSalaryComponents = () => {
    const bp = parseFloat(basicPay) || 0
    const da = bp * 0.30
    const hra = bp * 0.10
    const specialAllowance = bp * 0.05
    const totalSalary = bp + da + hra + specialAllowance
    
    return { bp, da, hra, specialAllowance, totalSalary }
  }

  const { bp, da, hra, specialAllowance, totalSalary } = calculateSalaryComponents()

  // Check grade based on total salary
  const checkGrade = () => {
    if (!basicPay || parseFloat(basicPay) <= 0 || isNaN(parseFloat(basicPay))) {
      alert('⚠️ Please enter a valid basic pay amount!')
      return
    }
    
    if (totalSalary >= 10000 && totalSalary <= 20000) {
      setGrade('A')
    } else if (totalSalary >= 20001 && totalSalary <= 30000) {
      setGrade('B')
    } else if (totalSalary >= 30001 && totalSalary <= 40000) {
      setGrade('C')
    } else if (totalSalary > 40000) {
      setGrade('EXC')
    } else {
      setGrade('N/A')
      alert('⚠️ Total salary is below minimum threshold (₹10,000). Grade not applicable.')
    }
    setBonus(null)
  }

  // Check bonus based on grade
  const checkBonus = () => {
    if (!basicPay || parseFloat(basicPay) <= 0 || isNaN(parseFloat(basicPay))) {
      alert('⚠️ Please enter a valid basic pay amount!')
      return
    }
    
    if (!grade || grade === 'N/A') {
      alert('⚠️ Please check grade first!')
      return
    }

    let bonusPercentage = 0
    switch (grade) {
      case 'A':
        bonusPercentage = 0.15
        break
      case 'B':
        bonusPercentage = 0.12
        break
      case 'C':
        bonusPercentage = 0.06
        break
      case 'EXC':
        bonusPercentage = 0.05
        break
      default:
        bonusPercentage = 0
    }
    
    setBonus(bp * bonusPercentage)
  }

  const getGradeColor = (g) => {
    switch(g) {
      case 'A': return 'from-emerald-400 to-teal-500'
      case 'B': return 'from-green-400 to-emerald-500'
      case 'C': return 'from-lime-400 to-green-500'
      case 'EXC': return 'from-yellow-400 to-amber-500'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex flex-col">
      {/* Navbar */}
      <nav className="backdrop-blur-md bg-white/30 border-b border-green-200/50 shadow-lg flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2.5 rounded-xl shadow-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Employee Tax Calculator
                </h1>
                <p className="text-sm text-green-600/70">Salary & Benefits Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-green-700">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-4 overflow-y-auto w-full">
        <div className="w-full max-w-6xl backdrop-blur-xl bg-white/40 rounded-3xl shadow-2xl border border-green-200/50 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-400/20 to-emerald-400/20 p-6 border-b border-green-200/50">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-7 h-7 text-green-600" />
              <h2 className="text-2xl font-bold text-green-800">Salary Calculator</h2>
            </div>
            <p className="mt-1 text-green-700/80">Calculate your total salary, grade, and bonus</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Input Section */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-green-800 uppercase tracking-wide">
                Basic Pay (₹)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 font-bold text-lg">₹</span>
                <input
                  type="number"
                  value={basicPay}
                  onChange={(e) => {
                    const value = e.target.value
                    // Allow empty string or valid positive numbers
                    if (value === '' || (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)) {
                      setBasicPay(value)
                      setGrade('')
                      setBonus(null)
                    }
                  }}
                  onKeyPress={(e) => {
                    // Prevent negative sign and invalid characters
                    if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                      e.preventDefault()
                    }
                  }}
                  placeholder="Enter basic pay amount"
                  min="0"
                  step="0.01"
                  className="w-full pl-10 pr-4 py-4 bg-white/60 backdrop-blur-sm border-2 border-green-200 rounded-xl focus:border-green-400 focus:ring-4 focus:ring-green-200/50 outline-none transition-all text-lg font-medium text-green-900 placeholder:text-green-400/50"
                />
              </div>
            </div>

            {/* Salary Breakdown */}
            {basicPay && parseFloat(basicPay) > 0 && !isNaN(parseFloat(basicPay)) && (
              <div className="space-y-3 animate-in fade-in duration-500">
                <h3 className="text-lg font-bold text-green-800 flex items-center space-x-2">
                  <Calculator className="w-5 h-5" />
                  <span>Salary Breakdown</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex justify-between items-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-green-200/50">
                    <span className="text-green-700 font-medium text-sm">Basic Pay</span>
                    <span className="text-green-900 font-bold">₹ {bp.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-green-200/50">
                    <span className="text-green-700 font-medium text-sm">DA (30%)</span>
                    <span className="text-green-900 font-bold">₹ {da.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-green-200/50">
                    <span className="text-green-700 font-medium text-sm">HRA (10%)</span>
                    <span className="text-green-900 font-bold">₹ {hra.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-green-200/50">
                    <span className="text-green-700 font-medium text-sm">Special Allowance (5%)</span>
                    <span className="text-green-900 font-bold">₹ {specialAllowance.toFixed(2)}</span>
                  </div>
                  <div className="md:col-span-2 flex justify-between items-center p-4 bg-gradient-to-r from-green-400/30 to-emerald-400/30 rounded-xl border-2 border-green-300">
                    <span className="text-green-900 font-bold text-lg">Total Salary</span>
                    <span className="text-green-900 font-bold text-2xl">₹ {totalSalary.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Check Grade Button */}
            {basicPay && parseFloat(basicPay) > 0 && !isNaN(parseFloat(basicPay)) && (
              <button
                onClick={checkGrade}
                className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Award className="w-5 h-5" />
                <span>Check Grade</span>
              </button>
            )}
            
            {/* Invalid Input Warning */}
            {basicPay && (parseFloat(basicPay) <= 0 || isNaN(parseFloat(basicPay))) && (
              <div className="p-4 bg-red-100 border-2 border-red-300 rounded-xl animate-in fade-in duration-300">
                <p className="text-red-700 font-semibold text-center">⚠️ Please enter a valid positive amount</p>
              </div>
            )}

            {/* Grade Display */}
            {grade && grade !== 'N/A' && (
              <div className="grid md:grid-cols-2 gap-4 animate-in fade-in duration-500">
                <div className={`p-6 bg-gradient-to-r ${getGradeColor(grade)} rounded-xl shadow-lg md:col-span-2`}>
                  <div className="text-center">
                    <p className="text-white/90 font-medium mb-2">Employee Grade</p>
                    <p className="text-5xl font-bold text-white drop-shadow-lg">{grade}</p>
                  </div>
                </div>

                {/* Check Bonus Button */}
                <button
                  onClick={checkBonus}
                  className="md:col-span-2 w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <DollarSign className="w-5 h-5" />
                  <span>Check Bonus</span>
                </button>
              </div>
            )}

            {/* Bonus Display */}
            {bonus !== null && (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div className="p-6 bg-gradient-to-r from-yellow-400/30 to-amber-400/30 rounded-xl border-2 border-yellow-300">
                  <div className="text-center space-y-3">
                    <p className="text-amber-800 font-semibold text-lg">Bonus Amount</p>
                    <p className="text-5xl font-bold text-amber-900">₹ {bonus.toFixed(2)}</p>
                    <p className="text-amber-700 text-sm">
                      Grade {grade} receives {grade === 'A' ? '15%' : grade === 'B' ? '12%' : grade === 'C' ? '6%' : '5%'} of Basic Pay
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App