package com.suelta_app;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;

import java.util.Calendar;

/**
 * AppWidgetProvider para el widget nativo de ¡Suelta!.
 * Muestra recordatorios diarios de consciencia, frases de introspección
 * y permite abrir directamente la app al tocar el widget.
 */
public class SueltaWidgetReceiver extends AppWidgetProvider {

    public static final String ACTION_ACTUALIZAR_WIDGET = "com.suelta_app.ACTION_ACTUALIZAR_WIDGET";

    private static final String[] AFIRMACIONES_DIARIAS = {
        "¿Qué emoción o tensión pide hoy tu permiso para ser liberada?",
        "Inhala calma, exhala juicio. Este momento es seguro para ti.",
        "El cuerpo expresa lo que el alma calla. Escucha tus sensaciones con ternura.",
        "No tienes que resolver todo hoy. Da un paso amable hacia tu paz interior.",
        "5 minutos de respiración consciente pueden transformar tu sistema nervioso.",
        "Honra tus raíces, libera las lealtades que no te corresponden cargar.",
        "Cada síntoma es una respuesta biológica de adaptación. ¿Qué mensaje trae hoy?",
        "Siente tus pies en la tierra. Estás a salvo en tu propio cuerpo.",
        "Soltar no es olvidar; es abrir espacio para florecer con ligereza.",
        "Tu valor no depende de tu productividad, sino de tu presencia consciente."
    };

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            actualizarWidget(context, appWidgetManager, appWidgetId);
        }
    }

    public static void actualizarWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        try {
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.suelta_widget);

            // Seleccionar afirmación o reflexión según el día del año
            int diaDelAnio = Calendar.getInstance().get(Calendar.DAY_OF_YEAR);
            String afirmacion = AFIRMACIONES_DIARIAS[diaDelAnio % AFIRMACIONES_DIARIAS.length];
            views.setTextViewText(R.id.widget_quote, afirmacion);
            views.setTextViewText(R.id.widget_subtext, "Toca para abrir tu diario o reto de 21 días");

            // Intent para abrir MainActivity al presionar el widget o el botón de acción
            Intent intent = new Intent(context, MainActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
            intent.putExtra("origen_widget", true);

            PendingIntent pendingIntent = PendingIntent.getActivity(
                context,
                0,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
            );

            views.setOnClickPendingIntent(R.id.widget_root, pendingIntent);
            views.setOnClickPendingIntent(R.id.widget_action_text, pendingIntent);

            // Notificar al gestor de widgets
            appWidgetManager.updateAppWidget(appWidgetId, views);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        if (ACTION_ACTUALIZAR_WIDGET.equals(intent.getAction())) {
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
            ComponentName esteWidget = new ComponentName(context, SueltaWidgetReceiver.class);
            int[] appWidgetIds = appWidgetManager.getAppWidgetIds(esteWidget);
            onUpdate(context, appWidgetManager, appWidgetIds);
        }
    }

    @Override
    public void onEnabled(Context context) {
        super.onEnabled(context);
    }

    @Override
    public void onDisabled(Context context) {
        super.onDisabled(context);
    }
}
