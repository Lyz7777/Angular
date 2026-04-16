package co.edu.unicauca.distribuidos.core.fachadaServices.services;

import java.time.LocalDate;
import java.util.List;

import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.FranjaDTOPeticion;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.FranjaDTORespuesta;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.MedicoDTOPeticion;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.MedicoDTORespuesta;

public interface IMedicoService {

    List<MedicoDTORespuesta> findAll();

    MedicoDTORespuesta findById(Integer id);

    MedicoDTORespuesta save(MedicoDTOPeticion medico);

    MedicoDTORespuesta update(Integer id, MedicoDTOPeticion medico);

    boolean delete(Integer id);

    MedicoDTORespuesta registrarMedico(MedicoDTOPeticion medico);

    FranjaDTORespuesta registrarFranja(Integer idMedico, FranjaDTOPeticion franja);

    List<FranjaDTORespuesta> obtenerFranjasPorMedicoYFecha(Integer idMedico, LocalDate fecha);
}
