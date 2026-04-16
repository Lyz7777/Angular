package co.edu.unicauca.distribuidos.core.fachadaServices.DTO;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FranjaDTORespuesta {
    private Integer id;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime horaInicio;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime horaFin;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fecha;

    private String estado;
    private Integer idMedico;
}
