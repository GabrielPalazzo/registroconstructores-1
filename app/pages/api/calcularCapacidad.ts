import { CalculadoraCapacidad } from 'rnc-main-lib'

export default async (req, res) => {
    const tramite: TramiteAlta = JSON.parse(req.body.payload)[0].tramite
    const calculadora = new CalculadoraCapacidad(tramite)
    await calculadora.init()
    const capacidadEjecucion = calculadora
        .getMontoCertificacionesPorPeriodo()
        .aplicarIndiceCorreccion()
        .ordenarMontoDescendente()
        .tomarLosTresPrimerosElementos()
        .aplicarPromedioLineal()
        .aplicarIndicesEconomicos()
        .actualizarPorAntiguedad()
        .value

    const capacidadFinanciera =
        calculadora.filtrarObrasCandidatas()
            .value
            .map(obra => {
                return calculadora.getCompromiso(obra) + calculadora.getIndicadorMultiplicador(obra)
            })
            .reduce((acc, val) => acc += val,0)

    //console.log(getTramiteFromState().ddjjObras[0])


    res.json({
        capacidadEjecucion,
        capacidadFinanciera:  capacidadFinanciera - capacidadEjecucion,
        evidencia: calculadora.getEvidencia()
    })
}