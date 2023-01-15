const calculateApparentPower = (active_power, reactive_power) => {
    try {
        let apparent_power = Math.sqrt(Math.pow(active_power, 2) + Math.pow(reactive_power, 2));
        return apparent_power
    } catch (e) {
        console.log(e);
    }
}

const calculatePF = (active_power, reactive_power) => {
    try {
        let apparent_power = calculateApparentPower(active_power, reactive_power);
        let pf = (active_power / apparent_power);
        return reactive_power >= 0 ? pf : -pf;
    } catch (e) {
        console.log(e);
    }
}

const calculateKVAR = (active_power, reactive_power, pf_setpoint) => {
    try {
        let pf = calculatePF(active_power, reactive_power);
        let kvar = reactive_power - Math.sqrt(Math.pow((active_power / pf_setpoint), 2) - Math.pow(active_power, 2))
        return pf < pf_setpoint ? kvar : 0;
    } catch (e) {
        console.log(e);
    }
}