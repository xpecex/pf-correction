$(window).on('load', () => {

    const translations = {
        "en": {
            "title": "Power Factor Correction Calculator",
            "subtitle": "",
            "pf_setpoint": "PF (setpoint)",
            "simple_calculator": "Simple Calculator",
            "file_calculator": "Calculate from File",
            "active_power": "Active Power",
            "reactive_power": "Reactive Power",
            "power_factor": "Power Factor (Current)",
            "kvar_correction": "kVAR (Required)",
            "calculate": "Calculate",
            "file": "File",
            "timestamp": "Date/Time"
        },
        "pt": {
            "title": "Calculadora de Correção do Fator de Potência",
            "subtitle": "",
            "pf_setpoint": "FP (setpoint)",
            "simple_calculator": "Calculadora Simples",
            "file_calculator": "Calcular de Arquivo",
            "active_power": "Potência Ativa",
            "reactive_power": "Potência Reativa",
            "power_factor": "Fator de Potência (Atual)",
            "kvar_correction": "kVAR (Necessário)",
            "calculate": "Calcular",
            "file": "Arquivo",
            "timestamp": "Data/Hora"
        }
    }

    const locales = Object.keys(translations);
    const default_locale = "en";
    const user_locales = navigator.languages;
    const locale = user_locales.filter(value => locales.includes(value))[0] ? user_locales.filter(value => locales.includes(value))[0] : default_locale;

    const translate = (element) => {
        const key = element.getAttribute("data-i18n-key");
        const translation = translations[locale][key];
        element.innerText = translation;
    }

    document.querySelectorAll("[data-i18n-key]").forEach(translate);

});