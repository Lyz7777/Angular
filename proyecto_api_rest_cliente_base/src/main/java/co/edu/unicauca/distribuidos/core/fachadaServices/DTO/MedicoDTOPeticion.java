package co.edu.unicauca.distribuidos.core.fachadaServices.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicoDTOPeticion {
    private String nombre;
    private String apellido;
    private String email;
}
