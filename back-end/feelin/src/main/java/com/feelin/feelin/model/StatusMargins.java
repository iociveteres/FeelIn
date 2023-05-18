package com.feelin.feelin.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.Column;
import javax.persistence.Entity;

@Getter
@Setter
@ToString
public class StatusMargins {
    @Getter
    @Setter
    @ToString
    public static class HighMargins  {
        public static final int pressureHigh = 130;
        public static final int pressureLow = 85;
        public static final int pulse = 90;
        public static final float temperature = 37.2F;
    }
    @Getter
    @Setter
    @ToString
    public static class LowMargins  {
        public static final int pressureHigh = 110;
        public static final int pressureLow = 70;
        public static final int pulse = 50;
        public static final float temperature = 35.9F;
        public static final int sleepQuality = 4; // 1 to 10
        public static final int generalState = 4; // 1 to 10
    }

    public static HighMargins highMargins;
    public static LowMargins lowMargins;
}
