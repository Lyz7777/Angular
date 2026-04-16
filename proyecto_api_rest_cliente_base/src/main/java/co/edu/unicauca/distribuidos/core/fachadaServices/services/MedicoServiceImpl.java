package co.edu.unicauca.distribuidos.core.fachadaServices.services;

import java.sql.Time;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import co.edu.unicauca.distribuidos.core.capaAccesoADatos.models.FranjaEntity;
import co.edu.unicauca.distribuidos.core.capaAccesoADatos.models.MedicoEntity;
import co.edu.unicauca.distribuidos.core.capaAccesoADatos.repositories.MedicoFranjaRepository;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.FranjaDTOPeticion;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.FranjaDTORespuesta;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.MedicoDTOPeticion;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.MedicoDTORespuesta;

@Service
public class MedicoServiceImpl implements IMedicoService {

    private static final String ESTADO_DISPONIBLE = "DISPONIBLE";
    private static final String ESTADO_NO_DISPONIBLE = "NO_DISPONIBLE";
    private static final String ESTADO_OCUPADA = "OCUPADA";

    private static final LocalTime HORA_MINIMA = LocalTime.of(7, 0);
    private static final LocalTime HORA_MAXIMA = LocalTime.of(19, 0);

    private final MedicoFranjaRepository medicoFranjaRepository;
    private final ModelMapper modelMapper;

    public MedicoServiceImpl(MedicoFranjaRepository medicoFranjaRepository, ModelMapper modelMapper) {
        this.medicoFranjaRepository = medicoFranjaRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public MedicoDTORespuesta registrarMedico(MedicoDTOPeticion medico) {
        MedicoEntity medicoEntity = modelMapper.map(medico, MedicoEntity.class);
        medicoEntity.setEstado(true);

        MedicoEntity medicoGuardado = medicoFranjaRepository.guardarMedico(medicoEntity);
        if (medicoGuardado == null) {
            throw new IllegalArgumentException("No fue posible registrar el medico");
        }

        return modelMapper.map(medicoGuardado, MedicoDTORespuesta.class);
    }

    @Override
    public FranjaDTORespuesta registrarFranja(Integer idMedico, FranjaDTOPeticion franja) {
        validarExistenciaMedico(idMedico);
        validarFranja(franja);

        if (medicoFranjaRepository.existeTraslapeFranja(idMedico, franja.getFecha(),
                Time.valueOf(franja.getHoraInicio()), Time.valueOf(franja.getHoraFin()))) {
            throw new IllegalArgumentException("La franja se traslapa con otra franja ya registrada");
        }

        FranjaEntity franjaEntity = modelMapper.map(franja, FranjaEntity.class);
        franjaEntity.setIdMedico(idMedico);
        franjaEntity.setEstado(normalizarEstado(franja.getEstado()));

        FranjaEntity franjaGuardada = medicoFranjaRepository.guardarFranja(franjaEntity);
        if (franjaGuardada == null) {
            throw new IllegalArgumentException("No fue posible registrar la franja");
        }

        return modelMapper.map(franjaGuardada, FranjaDTORespuesta.class);
    }

    @Override
    public List<FranjaDTORespuesta> obtenerFranjasPorMedicoYFecha(Integer idMedico, LocalDate fecha) {
        validarExistenciaMedico(idMedico);
        List<FranjaEntity> franjas = medicoFranjaRepository.buscarFranjasPorMedicoYFecha(idMedico, fecha);
        return modelMapper.map(franjas, new TypeToken<List<FranjaDTORespuesta>>() {
        }.getType());
    }

    private void validarExistenciaMedico(Integer idMedico) {
        if (medicoFranjaRepository.buscarMedicoPorId(idMedico).isEmpty()) {
            throw new IllegalArgumentException("No existe un medico con id " + idMedico);
        }
    }

    private void validarFranja(FranjaDTOPeticion franja) {
        if (franja.getFecha() == null || franja.getHoraInicio() == null || franja.getHoraFin() == null) {
            throw new IllegalArgumentException("La fecha y horas de la franja son obligatorias");
        }

        if (!franja.getHoraInicio().isBefore(franja.getHoraFin())) {
            throw new IllegalArgumentException("La hora de inicio debe ser menor a la hora de fin");
        }

        if (franja.getHoraInicio().isBefore(HORA_MINIMA) || franja.getHoraFin().isAfter(HORA_MAXIMA)) {
            throw new IllegalArgumentException("La franja debe estar entre las 07:00 y las 19:00");
        }

        long minutos = Duration.between(franja.getHoraInicio(), franja.getHoraFin()).toMinutes();
        if (minutos != 30) {
            throw new IllegalArgumentException("La duracion de cada franja debe ser de 30 minutos");
        }

        if (!esMediaHoraValida(franja.getHoraInicio()) || !esMediaHoraValida(franja.getHoraFin())) {
            throw new IllegalArgumentException("Las franjas solo pueden iniciar/finalizar en minutos 00 o 30");
        }

        normalizarEstado(franja.getEstado());
    }

    private boolean esMediaHoraValida(LocalTime hora) {
        return hora.getMinute() == 0 || hora.getMinute() == 30;
    }

    private String normalizarEstado(String estado) {
        String estadoValidado = estado == null || estado.isBlank() ? ESTADO_DISPONIBLE : estado.trim().toUpperCase();

        if (!ESTADO_DISPONIBLE.equals(estadoValidado)
                && !ESTADO_NO_DISPONIBLE.equals(estadoValidado)
                && !ESTADO_OCUPADA.equals(estadoValidado)) {
            throw new IllegalArgumentException("El estado debe ser DISPONIBLE, NO_DISPONIBLE u OCUPADA");
        }

        return estadoValidado;
    }
}
