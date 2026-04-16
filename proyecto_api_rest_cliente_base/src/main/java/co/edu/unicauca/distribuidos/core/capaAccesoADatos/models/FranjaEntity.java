
package co.edu.unicauca.distribuidos.core.capaAccesoADatos.models;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FranjaEntity {
    private Integer id;
    private LocalTime horaInicio;
    private LocalTime horaFin;
    private LocalDate fecha;
    private String estado;
    private Integer idMedico;

}

