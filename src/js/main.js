$(window).on('load', () => {
    M.AutoInit();

    $("#simple_calculate").click(() => {
        let active_power = $("#active_power").val().replace(/,/g, '.');
        let reactive_power = $("#reactive_power").val().replace(/,/g, '.');
        let pf_setpoint = $("#pf_setpoint").val().replace(/,/g, '.');

        if (active_power && reactive_power && pf_setpoint) {
            let kva = calculateApparentPower(active_power, reactive_power);
            let pf = calculatePF(active_power, reactive_power);
            let kvar = calculateKVAR(active_power, reactive_power, pf_setpoint);

            $("#power_factor").val(pf);
            $("#kvar_correction").val(kvar);
            console.log(`Active Power: ${active_power} - Reactive Power: ${reactive_power} - kVA: ${kva} - PF (current): ${pf} - kVAR: ${kvar} - PF (setpoint): ${pf_setpoint}`);
        } else {
            alert("You need to fill in all available fields!");
        }
    });

    $("#csv").change((el) => {
        const reader = new FileReader();
        reader.onload = () => {
            $("#table").find("tbody").html();
            let lines = reader.result.split(/\r\n|\n|\r/).filter(n => n);
            if (lines.length > 0) {
                for (let line of lines) {
                    let timestamp = line.split(',')[0]
                    let active_power = line.split(',')[1]
                    let reactive_power = line.split(',')[2]
                    let pf_setpoint = $("#pf_setpoint").val().replace(/,/g, '.');
                    let kva = calculateApparentPower(active_power, reactive_power);
                    let pf = calculatePF(active_power, reactive_power);
                    let kvar = calculateKVAR(active_power, reactive_power, pf_setpoint);

                    $("#table").find("tbody").append(`
                    <tr class="${pf < pf_setpoint ? "bg_red" : "bg_green"}">
                        <td>${timestamp}</td>
                        <td>${parseFloat(active_power).toFixed(3)}</td>
                        <td>${parseFloat(reactive_power).toFixed(3)}</td>
                        <td>${parseFloat(pf).toFixed(3)}</td>
                        <td>${parseFloat(kvar).toFixed(3)}</td>
                        <td>${parseFloat(pf_setpoint).toFixed(3)}</td>
                    </tr>`
                    );
                }
            }
        }
        reader.readAsBinaryString($(el.target).prop('files')[0]);
    });
});