export const holidays = {
  tabs: {
    daysUsed: "Días utilizados",
    requestsShort: "Solicitudes en trámite",
    requestsLong: "Solicitudes de vacaciones en trámite",
  },

  titles: {
    daysUsedQuery: "Consulta de días utilizados",
    pendingRequests: "Solicitudes en trámite",
    requirements: "Requisitos",
    requestDetails: "Detalles de solicitudes de vacaciones",
  },

  actions: {
    addEnjoyment: "Agregar solicitud de disfrute",
    addPayment: "Agregar solicitud de pago",
    requestPayment: "Solicitar pago",
    close: "Cerrar",
    actionsColumn: "Acciones",
  },

  tooltips: {
    viewDetails: "Ver más detalles",
    noPrivileges: "Sin privilegios",
    deleteRequest: "Descartar solicitud",
  },

  assisted: {
    previous: "Anterior",
    next: "Siguiente",
    submit: "Enviar",
  },

  infoModal: {
    title: "Información",
    disabledActionTitle: "Acción inhabilitada",
    disabledReasonTitle: "¿Por qué no se puede descartar?",
    confirmButton: "Entendido",
    genericDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },

  daysUsedTable: {
    headers: {
      startDate: "Fecha de inicio o pago",
      usageMode: "Modalidad de uso",
      days: "Días",
    },
    caption: "Consulta de días utilizados",
    emptyState: "Aún no has utilizado ningún día de vacaciones.",
  },

  privileges: {
    enjoyment:
      "No se puede solicitar disfrute de vacaciones, ya que no tiene un contrato activo o no cuenta con los privilegios necesarios.",
    payment:
      "No se puede solicitar pago de vacaciones, ya que no tiene un contrato activo o no cuenta con los privilegios necesarios.",
  },

  sendEnjoymentModal: {
    description: "¿Realmente deseas enviar la solicitud de vacaciones?",
  },

  requestsTable: {
    caption: "Solicitudes de vacaciones en trámite",
    headers: {
      description: "Tipo de solicitud de vacaciones",
      date: "Fecha de solicitud",
      days: "Cantidad de días hábiles",
      status: "Estado de la solicitud",
      details: "Ver detalles de la solicitud",
      delete: "Eliminar solicitud",
      actionsColumn: "Acciones",
    },
  },

  breadcrumbs: {
    home: "Inicio",
    holidays: "Vacaciones",
    requestPayment: "Solicitar pago",
    requestEnjoyment: "Solicitar disfrute",
  },

  sendPaymentModal: {
    description: "¿Realmente deseas enviar la solicitud de pago?",
  },

  flags: {
    paymentSuccess: {
      title: "Solicitud enviada",
      message: "La solicitud de pago fue enviada exitosamente.",
    },
  },

  alerts: {
    first: {
      title: "Alerta 1",
      requirement: "Estar al día en las obligaciones.",
      cause: "El cliente tiene en mora el crédito de vivienda.",
    },
    second: {
      title: "Alerta 2",
      requirement: "Requiere 90 días de antigüedad.",
      cause: "El cliente tiene solo 60 días de afiliación.",
    },
  },

  generalInformationForm: {
    fields: {
      daysToPay: { label: "Días hábiles a pagar", placeholder: "Ej: 2" },
      startDate: {
        label: "Fecha de inicio",
        placeholder: "Selecciona la fecha",
      },
      contract: { label: "Contrato", placeholder: "Selecciona de la lista" },
      observations: {
        label: "Observaciones",
        placeholder: "Detalles a tener en cuenta.",
      },
    },
  },

  requestEnjoyment: {
    steps: {
      requirements: "Revisa los requisitos para el disfrute de vacaciones.",
      generalInfo: "Proporciona información acerca de tu solicitud.",
      verification: "Verifica la información proporcionada.",
    },
    certificationOptions: {
      server: "Certificado de servidor",
      company: "Certificado de pertenencia a empresa",
      representative: "Certificado de representante",
    },
    contractOptions: {
      obra: "Contrato por obra o labor",
      fijo: "Contrato de trabajo a término fijo",
      indefinido: "Contrato de trabajo a término indefinido",
    },
  },

  modals: {
    confirmDelete: {
      title: "Eliminación",
      buttonText: "Eliminar",
      inputLabel: "Justificación",
      inputPlaceholder: "¿Por qué eliminarás el registro?",
      secondaryButtonText: "Cancelar",
      description:
        "Al descartar una solicitud esta no podrá continuar su trámite y desaparecerá. ¿Realmente quieres descartar esta solicitud?",
      maxLength: 500,
    },

    infoNoPrivileges: "No tienes privilegios",
    cannotView: "No tienes privilegios para eliminar este registro.",
  },

  detailsModal: {
    title: "Detalles de solicitudes de vacaciones",
    buttonLabel: "Cerrar",
    fields: {
      daysOff: "Días de disfrute",
    },
  },

  verification: {
    backToStep: "Regresar a este paso",
  },

  statusUnknown: "Estado desconocido",

  vacationTypes: {
    paid: "Pagadas",
    enjoyed: "Disfrutadas",
  },
};
