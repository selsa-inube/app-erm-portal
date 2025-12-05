export const certifications = {
  titles: {
    page: "Consulta de certificaciones en trámite",
    addRequestPage: "Agregar solicitud",
    certifications: "Certificaciones",
    home: "Inicio",
  },

  buttons: {
    addRequest: "Agregar solicitud de certificación",
  },

  infoModal: {
    title: "Acción inhabilitada",
    titleDescription: "¿Por qué está inhabilitado?",
    defaultDescription:
      "No se puede solicitar la certificación, ya que no tiene un contrato activo o no cuenta con los privilegios necesarios.",
    closeButtonLabel: "Cerrar",
  },

  assistedControls: {
    goBackText: "Anterior",
    goNextText: "Siguiente",
    submitText: "Enviar",
    returnToStepText: "Regresar a este paso",
  },

  verificationLabels: {
    requestType: "Tipo de solicitud:",
    addressee: "Destinatario:",
    contract: "Contrato:",
    observations: "Observaciones:",
  },

  table: {
    headers: {
      requestNumber: "Número de solicitud",
      type: "Tipo de certificación",
      date: "Fecha de solicitud",
      status: "Estado de certificación",
      details: "Ver detalles",
      delete: "Eliminar solicitud",
      actions: "Acciones",
    },

    emptyState: {
      line1: "Aún no tienes solicitudes en trámite. presiona",
      line2: "“+ Agregar solicitud”",
      line3: "para empezar.",
    },

    tooltips: {
      viewDetails: "Ver más detalles",
      noPrivileges: "Sin privilegios",
      deleteRequest: "Descartar solicitud",
    },

    modals: {
      infoTitle: "Información",
      infoNoPrivileges: "No tienes privilegios",
      cannotView: "No tienes privilegios para ver detalles.",
      cannotDelete: "No tienes permisos para descartar esta solicitud.",
      deleteTitle: "Descartar",
      deleteButton: "Descartar",
      deleteJustification: "Justificación",
      deletePlaceholder: "¿Por qué eliminarás el registro?",
      deleteDescription:
        "Al descartar una solicitud esta no podrá continuar su trámite y desaparecerá. ¿Realmente quieres descartar esta solicitud?",
      closeButton: "Entendido",
      detailTitle: "Detalles de la certificación",
      detailModalClose: "Cerrar",
    },
  },

  alerts: [
    {
      title: "Alerta 1",
      requirement: "Estar al día en las obligaciones.",
      cause: "El cliente tiene en mora el crédito de vivienda.",
    },
    {
      title: "Alerta 2",
      requirement: "Requiere 90 días de antigüedad.",
      cause: "El cliente tiene solo 60 días de afiliación.",
    },
  ],

  tableHeaders: {
    requestNumber: "Número de solicitud",
    type: "Tipo de certificación",
    date: "Fecha de solicitud",
    status: "Estado de certificación",
    details: "Ver detalles",
    delete: "Eliminar solicitud",
  },

  placeholders: {
    certificationType: "Selecciona de la lista",
    addressee: "Ej: A quien interese",
    contract: "Selecciona de la lista",
    observations: "Detalles a tener en cuenta.",
  },

  newCertificationSteps: [
    {
      id: 1,
      number: 1,
      name: "Requisitos no cumplidos",
      description: "Proporciona información acerca de tu solicitud.",
    },
    {
      id: 2,
      number: 2,
      name: "Información general",
      description: "Revisa los requisitos para el disfrute de vacaciones.",
    },
    {
      id: 3,
      number: 3,
      name: "Verificación",
      description: "Verifica la información proporcionada.",
    },
  ],

  certificationOptions: [
    {
      id: "1",
      label: "Certificado de servidor",
      value: "certificado de servidor",
    },
    {
      id: "2",
      label: "Certificado de pertenencia a empresa",
      value: "certificado de pertenencia a empresa",
    },
    {
      id: "3",
      label: "Certificado de representante",
      value: "certificado de representante",
    },
  ],

  contractOptions: [
    {
      id: "1",
      label: "Contrato por obra o labor",
      value: "contrato por obra o labor.",
    },
    {
      id: "2",
      label: "Contrato de trabajo a término fijo",
      value: "contrato de trabajo a término fijo.",
    },
    {
      id: "3",
      label: "Contrato de trabajo a término indefinido",
      value: "contrato de trabajo a término indefinido.",
    },
  ],

  sendRequestModal: {
    descriptionText: "¿Realmente deseas enviar la solicitud de certificación?",
    submitButton: "Enviar",
    cancelButton: "Cancelar",
  },

  requestInfoModal: {
    submitButton: "Aceptar",
    closeButton: "Cerrar",
  },
};
