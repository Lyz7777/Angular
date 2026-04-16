package co.edu.unicauca.distribuidos.core.capaAccesoADatos.repositories;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Time;
import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import co.edu.unicauca.distribuidos.core.capaAccesoADatos.models.FranjaEntity;
import co.edu.unicauca.distribuidos.core.capaAccesoADatos.models.MedicoEntity;
import co.edu.unicauca.distribuidos.core.capaAccesoADatos.repositories.conexion.ConexionBD;

@Repository
public class MedicoFranjaRepository {

    private final ConexionBD conexionABaseDeDatos;

    public MedicoFranjaRepository() {
        this.conexionABaseDeDatos = new ConexionBD();
    }

    public MedicoEntity guardarMedico(MedicoEntity medico) {
        MedicoEntity medicoAlmacenado = null;
        try {
            conexionABaseDeDatos.conectar();
            String consulta = "insert into medicos(nombre, apellido, email, estado) values(?,?,?,?)";
            PreparedStatement sentencia = conexionABaseDeDatos.getConnection().prepareStatement(consulta,
                    Statement.RETURN_GENERATED_KEYS);
            sentencia.setString(1, medico.getNombre());
            sentencia.setString(2, medico.getApellido());
            sentencia.setString(3, medico.getEmail());
            sentencia.setBoolean(4, medico.getEstado());

            int resultado = sentencia.executeUpdate();
            ResultSet generatedKeys = sentencia.getGeneratedKeys();
            if (resultado == 1 && generatedKeys.next()) {
                medicoAlmacenado = this.buscarMedicoPorId(generatedKeys.getInt(1)).orElse(null);
            }
            generatedKeys.close();
            sentencia.close();
        } catch (SQLException e) {
            System.out.println("error en la insercion de medico: " + e.getMessage());
        } finally {
            conexionABaseDeDatos.desconectar();
        }

        return medicoAlmacenado;
    }

    public Optional<MedicoEntity> buscarMedicoPorId(Integer idMedico) {
        MedicoEntity medico = null;

        try {
            conexionABaseDeDatos.conectar();
            String consulta = "select * from medicos where id=?";
            PreparedStatement sentencia = conexionABaseDeDatos.getConnection().prepareStatement(consulta);
            sentencia.setInt(1, idMedico);
            ResultSet res = sentencia.executeQuery();

            if (res.next()) {
                medico = new MedicoEntity();
                medico.setId(res.getInt("id"));
                medico.setNombre(res.getString("nombre"));
                medico.setApellido(res.getString("apellido"));
                medico.setEmail(res.getString("email"));
                medico.setEstado(res.getBoolean("estado"));
            }

            res.close();
            sentencia.close();
        } catch (SQLException e) {
            System.out.println("error consultando medico: " + e.getMessage());
        } finally {
            conexionABaseDeDatos.desconectar();
        }

        return medico == null ? Optional.empty() : Optional.of(medico);
    }

    public FranjaEntity guardarFranja(FranjaEntity franja) {
        FranjaEntity franjaAlmacenada = null;
        try {
            conexionABaseDeDatos.conectar();
            String consulta = "insert into franjas(horaInicio, horaFin, fecha, estado, idMedico) values(?,?,?,?,?)";
            PreparedStatement sentencia = conexionABaseDeDatos.getConnection().prepareStatement(consulta,
                    Statement.RETURN_GENERATED_KEYS);
            sentencia.setTime(1, Time.valueOf(franja.getHoraInicio()));
            sentencia.setTime(2, Time.valueOf(franja.getHoraFin()));
            sentencia.setDate(3, Date.valueOf(franja.getFecha()));
            sentencia.setString(4, franja.getEstado());
            sentencia.setInt(5, franja.getIdMedico());

            int resultado = sentencia.executeUpdate();
            ResultSet generatedKeys = sentencia.getGeneratedKeys();
            if (resultado == 1 && generatedKeys.next()) {
                franjaAlmacenada = this.buscarFranjaPorId(generatedKeys.getInt(1)).orElse(null);
            }
            generatedKeys.close();
            sentencia.close();
        } catch (SQLException e) {
            System.out.println("error en la insercion de franja: " + e.getMessage());
        } finally {
            conexionABaseDeDatos.desconectar();
        }

        return franjaAlmacenada;
    }

    public Optional<FranjaEntity> buscarFranjaPorId(Integer idFranja) {
        FranjaEntity franja = null;

        try {
            conexionABaseDeDatos.conectar();
            String consulta = "select * from franjas where id=?";
            PreparedStatement sentencia = conexionABaseDeDatos.getConnection().prepareStatement(consulta);
            sentencia.setInt(1, idFranja);
            ResultSet res = sentencia.executeQuery();

            if (res.next()) {
                franja = new FranjaEntity();
                franja.setId(res.getInt("id"));
                franja.setHoraInicio(res.getTime("horaInicio").toLocalTime());
                franja.setHoraFin(res.getTime("horaFin").toLocalTime());
                franja.setFecha(res.getDate("fecha").toLocalDate());
                franja.setEstado(res.getString("estado"));
                franja.setIdMedico(res.getInt("idMedico"));
            }

            res.close();
            sentencia.close();
        } catch (SQLException e) {
            System.out.println("error consultando franja por id: " + e.getMessage());
        } finally {
            conexionABaseDeDatos.desconectar();
        }

        return franja == null ? Optional.empty() : Optional.of(franja);
    }

    public List<FranjaEntity> buscarFranjasPorMedicoYFecha(Integer idMedico, LocalDate fecha) {
        List<FranjaEntity> franjas = new LinkedList<>();

        try {
            conexionABaseDeDatos.conectar();
            String consulta = "select * from franjas where idMedico=? and fecha=? order by horaInicio";
            PreparedStatement sentencia = conexionABaseDeDatos.getConnection().prepareStatement(consulta);
            sentencia.setInt(1, idMedico);
            sentencia.setDate(2, Date.valueOf(fecha));
            ResultSet res = sentencia.executeQuery();

            while (res.next()) {
                FranjaEntity franja = new FranjaEntity();
                franja.setId(res.getInt("id"));
                franja.setHoraInicio(res.getTime("horaInicio").toLocalTime());
                franja.setHoraFin(res.getTime("horaFin").toLocalTime());
                franja.setFecha(res.getDate("fecha").toLocalDate());
                franja.setEstado(res.getString("estado"));
                franja.setIdMedico(res.getInt("idMedico"));
                franjas.add(franja);
            }

            res.close();
            sentencia.close();
        } catch (SQLException e) {
            System.out.println("error consultando franjas por medico y fecha: " + e.getMessage());
        } finally {
            conexionABaseDeDatos.desconectar();
        }

        return franjas;
    }

    public boolean existeTraslapeFranja(Integer idMedico, LocalDate fecha, Time horaInicio, Time horaFin) {
        boolean existe = false;

        try {
            conexionABaseDeDatos.conectar();
            String consulta = "select count(*) as total from franjas "
                    + "where idMedico=? and fecha=? and (? < horaFin and ? > horaInicio)";
            PreparedStatement sentencia = conexionABaseDeDatos.getConnection().prepareStatement(consulta);
            sentencia.setInt(1, idMedico);
            sentencia.setDate(2, Date.valueOf(fecha));
            sentencia.setTime(3, horaInicio);
            sentencia.setTime(4, horaFin);
            ResultSet res = sentencia.executeQuery();
            if (res.next()) {
                existe = res.getInt("total") > 0;
            }
            res.close();
            sentencia.close();
        } catch (SQLException e) {
            System.out.println("error validando traslape de franjas: " + e.getMessage());
        } finally {
            conexionABaseDeDatos.desconectar();
        }

        return existe;
    }
}
