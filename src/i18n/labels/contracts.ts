export const contracts = {
  title: "Consulta histórica de contratos",

  actions: {
    add: "Agregar",
    addVinculation: "Agregar vinculación",
    modify: "Modificar",
    renew: "Renovar",
    terminate: "Terminar",
  },

  tags: {
    noContract: "El empleado NO tiene ningún contrato vigente.",
    pendingRequest:
      "El empleado NO tiene un contrato vigente, PERO tiene una solicitud de vinculación en trámite.",
  },

  modals: {
    detailTitle: "Detalles de consulta de contrato",
    detailCloseButton: "Cerrar",
    detailFields: {
      workplace: "Sitio de trabajo",
      formalizationDate: "Fecha de formalización",
      workSchedule: "Jornada laboral",
      lastSalary: "Perfil salarial",
      retirementDate: "Fecha de retiro",
      retirementReason: "Causal de retiro",
    },
    selectTitle: "Selecciona un contrato",
    selectDescription:
      "Selecciona el contrato sobre el que vas a ejecutar la acción seleccionada.",
    infoTitleDescription: "¿Por qué está inhabilitado?",
    noTerminateContract: "No hay contrato vigente para terminar",
    noFixedTermContract: "No hay contrato a término fijo",
    noRenewContract: "No hay contrato vigente para renovar",
    noModifyContract: "No hay contrato vigente para modificar",
    noDetailsPrivilege:
      "No tiene privilegios para ver los detalles del contrato",
    addVinculationBlocked: "No se puede agregar vinculación",
  },

  infoModal: {
    addVinculationDisabled:
      "No se puede agregar vinculación, ya que no tiene privilegios para ejecutar esta acción.",
  },
};
