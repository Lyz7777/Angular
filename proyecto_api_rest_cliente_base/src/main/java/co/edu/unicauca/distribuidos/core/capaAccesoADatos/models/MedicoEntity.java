package co.edu.unicauca.distribuidos.core.capaAccesoADatos.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicoEntity {
    private Integer id;
	private String nombre;
	private String apellido;
	private String email;
	private Boolean estado;

}

