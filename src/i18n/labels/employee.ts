export const employee = {
  selection: {
    title: "Seleccionar empleado",
    description:
      "Digita la cédula y/o nombre del empleado que quieres seleccionar.",
    loading: "Cargando empleados...",
    noResults: "No hay resultados para esta búsqueda.",
    continue: "Continuar",
    linkNewEmployee: "Vincular nuevo empleado",
    placeholder: "Palabra clave",
  },

  newEmployee: {
    title: "Vincular nuevo empleado",
    requirements: "Requisitos",

    steps: {
      personalData: {
        name: "Datos personales",
        description: "Completa los datos personales del empleado.",
      },
      contractualPosition: {
        name: "Datos de posición contractual",
        description: "Diligencia los datos solicitados.",
      },
      legalAccountingLocation: {
        name: "Ubicación jurídica y contable",
        description: "Define la asignación contable del empleado.",
      },
      assignments: {
        name: "Asignaciones",
        description: "Despliega las asignaciones seleccionadas.",
      },
      unmetRequirements: {
        name: "Requisitos no cumplidos",
        description: "Aspectos que son un impedimento y deben cambiar.",
      },
      verification: {
        name: "Verificación",
        description: "Confirma la información diligenciada.",
      },
    },

    assignments: {
      basicSalary: {
        title: "Asignación 1",
        assignment: "Salario básico",
      },
      connectivitySubsidy: {
        title: "Asignación 2",
        assignment: "Auxilio de conectividad",
      },
    },

    finishModal: {
      title: "Finalizar",
      description: "¿Realmente deseas finalizar la vinculación del empleado?",
      button: "Finalizar",
    },

    success: {
      flagTitle: "Solicitud enviada",
      flagMessage: "El registro del nuevo empleado fue enviado exitosamente.",
    },
  },

  requestInfoModal: {
    staffName: "Nombre Apellido",
  },

  assisted: {
    back: "Anterior",
    next: "Siguiente",
    submit: "Finalizar",
  },

  personalDataForm: {
    fields: {
      names: "Nombres",
      lastNames: "Apellidos",
      identificationNumber: "Número de identificación",
      resume: "Hoja de vida",
    },
    placeholders: {
      names: "Ej: Juan Daniel",
      lastNames: "Ej: Rodríguez Pérez",
      identificationNumber: "Número de identificación",
    },
    actions: {
      next: "Siguiente",
    },

    resumeModal: {
      title: "Adjuntar hoja de vida",
      close: "Cerrar",
      drag: "Arrastra un documento",
      or: "o",
      browse: "Busca un documento",
      maxWeight: "Peso máximo por archivo: 2.5MB",
      attachedDocuments: "Documentos adjuntos",
      cancel: "Cancelar",
      attach: "Adjuntar",

      errors: {
        onlyPdf: "Solo se permiten archivos PDF.",
        maxSize: "El archivo supera el tamaño máximo permitido de 2.5MB.",
      },
    },
  },

  assignmentsForm: {
    emptyTitle: "Aún NO hay asignaciones. Define asignaciones con el botón.",
    addAssignment: "Agregar asignación",
    previous: "Anterior",
    next: "Siguiente",
    assignmentTitle: "Asignación",
  },

  contractualPositionForm: {
    fields: {
      normativeFramework: "Marco normativo",
      contractType: "Tipo de contrato",
      startDate: "Fecha de inicio",
      endDate: "Fecha de finalización",
      company: "Empresa contratante",
      workingShift: "Jornada laboral",
      team: "Equipo de trabajo",
      position: "Cargo",
      salaryProfile: "Perfil salarial",
      jobMode: "Sitio de trabajo",
    },

    placeholders: {
      select: "Selecciona de la lista",
    },

    options: {
      normativeFramework: {
        cst: "Código Sustantivo del Trabajo",
        cc: "Código de Comercio",
        ne: "Normatividad Especial",
      },

      contractType: {
        indefinite_term: "Término Indefinido",
        fixed_term: "Término Fijo",
        project_based: "Obra o Labor",
      },

      company: {
        company_a: "Empresa A S.A.S",
        company_b: "Empresa B Ltda",
        company_c: "Empresa C S.A.",
      },

      workingShift: {
        full_time: "Tiempo Completo",
        part_time: "Medio Tiempo",
        hourly: "Por Horas",
      },

      team: {
        development: "Desarrollo",
        marketing: "Marketing",
        human_resources: "Recursos Humanos",
      },

      position: {
        senior_developer: "Desarrollador Senior",
        junior_analyst: "Analista Junior",
        project_manager: "Gerente de Proyecto",
      },

      salaryProfile: {
        profile_a: "Perfil A - Alto",
        profile_b: "Perfil B - Medio",
        profile_c: "Perfil C - Básico",
      },

      jobMode: {
        on_site: "Presencial",
        remote: "Remoto",
        hybrid: "Híbrido",
      },
    },
  },

  legalAccountingLocationForm: {
    fields: {
      project: "Proyecto",
      zonalSegmentation: "Segmentación zonal",
      costCenter: "Centro de costo",
    },
    placeholders: {
      select: "Selecciona de la lista",
    },
    actions: {
      previous: "Anterior",
      next: "Siguiente",
    },
  },

  validation: {
    required: "Para continuar, primero debes seleccionar un empleado.",
    invalidSelection: "Debes seleccionar un empleado de la lista.",
  },

  errors: {
    employeeNotFound: "Empleado no encontrado",
  },

  unmetRequirementsForm: {
    emptyState: {
      message:
        "El cliente no presenta restricción por requisitos en este momento.",
    },
    actions: {
      previous: "Anterior",
      next: "Siguiente",
    },
  },
};
